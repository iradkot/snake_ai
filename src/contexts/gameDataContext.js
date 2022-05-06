import React, {
  createContext,
  useState,
  useReducer,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { timeStringToMilliseconds } from '../utils/dateAndTime';
import { get } from 'lodash';
import TaseWebsiteContext from './taseWebsiteContext';
import { reducer, initialState } from '../reducers/indexInDayDataReducer';
import { subDays } from 'date-fns';

const GameDataContext = createContext();

export const GameDataContextProvider = (props) => {
  const [date, setDate] = useState(new Date('2019-01-03'));
  const [state, dispatch] = useReducer(reducer, initialState);
  const [realTimeValues, setRealTimeValues] = useState([]);
  const [realTimeDates, setRealTimeDates] = useState([]);
  const [clockInitialTime, setClockInitialTime] = useState(null);
  const [clockCurrentTime, setClockCurrentTime] = useState(clockInitialTime);
  const { getDayData } = useContext(TaseWebsiteContext);

  // Thursday data
  const thursdayDates = useMemo(() => {
    return get(state, 'thursday.dates', []);
  }, [state]);
  const thursdayValues = useMemo(() => {
    return get(state, 'thursday.values', []);
  }, [state]);

  // set realtime data on state change
  useEffect(() => {
    if (!!thursdayDates[0] && !!thursdayValues[0]) {
      setRealTimeDates([thursdayDates[0]]);
      setRealTimeValues([thursdayValues[0]]);
    }
  }, [state]);

  // useEffect(() => {
  //   getFiveDaysData(date);
  // }, []);

  const currentValue = useMemo(() => {
    return realTimeValues[realTimeValues.length - 1];
  }, [realTimeValues]);

  const currentTime = useMemo(() => {
    return realTimeDates[realTimeDates.length - 1];
  }, [realTimeValues]);

  const getFiveDaysData = useCallback(
    async (date) => {
      const day = date.getDay();
      const parsedDayData = await getDayData(date);
      dispatch({ type: day, payload: parsedDayData });
      const subDate = subDays(date, 1);
      if (day !== 0) {
        getFiveDaysData(subDate);
      }
    },
    [getDayData],
  );

  const handleRealTimeData = (time) => {
    // get index of current time
    const currentTimeIndex = thursdayDates.findIndex((itemOfTime) => itemOfTime === time);

    if (currentTimeIndex !== -1) {
      setRealTimeDates((prevState) => [...prevState, thursdayDates[currentTimeIndex]]);
      setRealTimeValues((prevState) => [...prevState, thursdayValues[currentTimeIndex]]);
    }
  };

  // Skip thursday timestap
  const skipTimeHandler = () => {
    const currentTimeIndex = thursdayDates.findIndex(
      (itemOfTime) => itemOfTime === thursdayDates[realTimeDates.length - 1],
    );
    if (currentTimeIndex !== -1) {
      setRealTimeDates((prevState) => [...prevState, thursdayDates[currentTimeIndex + 1]]);
      setRealTimeValues((prevState) => [...prevState, thursdayValues[currentTimeIndex + 1]]);
      setClockInitialTime(timeStringToMilliseconds(thursdayDates[currentTimeIndex + 1]) + 1000);
    }
  };

  const firstThursdayTime = get(state, 'thursday.dates[0]', false);
  const firstTimeInMilliseconds = timeStringToMilliseconds(firstThursdayTime);

  return (
    <GameDataContext.Provider
      value={{
        // game display props
        date,
        setDate,
        realTimeValues,
        realTimeDates,
        clockInitialTime,
        currentValue,
        currentTime,
        // clock props
        state,
        onTimeChange: handleRealTimeData,
        startTime: clockInitialTime || firstTimeInMilliseconds,
        skipTimeHandler,
        getFiveDaysData,
        firstTimeInMilliseconds,
        clockCurrentTime,
        setClockCurrentTime,
      }}
    >
      {props.children}
    </GameDataContext.Provider>
  );
};

export default GameDataContext;
