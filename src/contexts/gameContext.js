import React, { createContext, useState, useContext, useEffect } from 'react';
import GameDataContext from './gameDataContext';
import { timeStringToMilliseconds } from '../utils/dateAndTime';

const GameContext = createContext();

const sellTimeout = 1000 * 60 ; // 10 minutes

export const GameContextProvider =  (props) => {
    const [ buyPrice, setBuyPrice ] = useState(false);
    const [ buyTime, setBuyTime ] = useState(false);
    const [score, setScore] = useState(0);
    
    const { currentValue, currentTime } = useContext(GameDataContext)

    // const gameHandler =  () => {
    //     const buyTimeToMill =  timeStringToMilliseconds(buyTime);
    //     const currentTimeToMill =  timeStringToMilliseconds(currentTime);
    //     const offset = currentTimeToMill - buyTimeToMill;
    //     // if(offset > sellTimeout) {
    //     //     const newScore = currentValue - buyPrice;
    //     //     setScore(score + newScore);
    //     // }
    // }

    const handleBuying = () => {
        setBuyPrice(currentValue);
        setBuyTime(currentTime);
    }
    
    const handleSelling = () => {
        const sellResult = currentValue - buyPrice;
        console.log({ sellResult, currentValue, buyPrice });
        setScore(score + sellResult);
        setBuyPrice(false);
        setBuyTime(false);
    };
    useEffect(() => {
        console.log({ score })
    } ,[ score ])

    // useEffect(() => {
    //     if (buyPrice) gameHandler(currentValue, currentTime);
    //     // TODO Should listen to current time or to current value?
    // }, [currentValue, buyPrice]);
    
    return (
        <GameContext.Provider value={{ handleBuying, score, buyTime, handleSelling }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext;
