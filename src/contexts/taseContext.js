import React, { createContext, useState, useEffect, delay, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { setAxiosHeader } from '../api/axiosInstance';
import { get } from 'lodash';
import { CircularProgress } from '@material-ui/core';
import * as apiActions from '../api/requests';
import * as FirestoreService from '../firebase/firebase';
import AlertContext from '../alerts/alertsContext';

const TaseContext = createContext();

export const TaseContextProvider = (props) => {
  const [tokenData, setTokenData] = useLocalStorage('tokenData', { token: false, timeStamp: false });
  const [indicesList, setIndicesList] = useLocalStorage('indicesList', []);
  const [indicesEndOfDayData, setIndicesEndOfDayData] = useLocalStorage('indicesEndOfDayData', []);
  const [indexComponents, setIndexComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useContext(AlertContext);
  useEffect(() => {
    if (tokenData) {
      setAxiosHeader(tokenData.token);
    }
  }, []);

  const getToken = async () => {
    try {
      setLoading(true);
      const response = await apiActions.getToken().then(
        (res) =>
          new Promise((resolve) => {
            setTimeout(resolve(res), 5000);
          }),
      );
      setLoading(false);
      // showAlert('info', 'Success getting list');
      const newToken = get(response, 'data.access_token', false);
      setTokenData({ token: newToken, timeStamp: new Date() });
      setAxiosHeader(newToken);
    } catch (e) {
      console.log('request error:', { e });
    }
  };

  const getIndicesList = async (tryCount = 0) => {
    if (tryCount > 5) throw new Error('cant get indicesList from fireBase');
    try {
      const firebaseResponse = await FirestoreService.getIndicesList();
      if (firebaseResponse.length === 0) {
        // getting tase list from tase servers(since we dont have it on our own db)
        try {
          const response = await apiActions.getTaseList();
          const result = get(response, 'data.indicesList.result', false);
          await FirestoreService.addItemToIndicesList(result);
          return await getIndicesList(++tryCount);
        } catch (e) {
          console.log('request error:2', { e });
        }
      } else {
        setIndicesList(firebaseResponse[0].indicesList);
      }
    } catch (e) {
      console.log('request error:', { e });
    }
  };

  const getIndexComponents = async ({ id, year = 2020, month = 12, day = 28 }, tryCount = 0) => {
    if (tryCount > 1) throw new Error('cant get indicesList from fireBase');
    try {
      const fireBaseResponse = await FirestoreService.getIndexComponents({ id, year, month, day });
      if (!!fireBaseResponse) {
        return setIndexComponents(get(fireBaseResponse, 'indexComponents.result'));
      } else {
        try {
          const { data } = await apiActions.getIndexesData({
            indexId: id,
            year,
            month,
            day,
          });
          await FirestoreService.addIndexComponents(data, id, year, month, day);
          return await getIndexComponents({ id, year, month, day }, ++tryCount);
        } catch (error) {
          console.log({ error });
        }
      }
    } catch (e) {
      console.log({ e });
    }
  };

  const getIndicesEndOfDayData = async ({ year = 2020, month = 3, day = 1 }, tryCount = 0) => {
    if (tryCount > 0) throw new Error('error getting indicesEndOfDayData!');
    try {
      const fireBaseResponse = await FirestoreService.getIndicesEndOfDayData({ year, month, day });
      if (!!fireBaseResponse) {
        // if got response
        return setIndicesEndOfDayData(get(fireBaseResponse, 'indicesEndOfDay.result'));
      } else {
        try {
          const { data } = await apiActions.getIndicesEndOfDayData({
            year,
            month,
            day,
          });
          if (!data) throw new Error('Unknown data response', data);
          await FirestoreService.addIndicesEndOfDayData(data, year, month, day);
          return await getIndicesEndOfDayData({ year, month, day }, ++tryCount);
        } catch (error) {
          console.log({ error });}
      }
    } catch (e) {
      console.log('request error:2', { e });
    }
  };

  return (
    <TaseContext.Provider
      value={{
        tokenData,
        getToken,
        getIndexComponents,
        loading,
        getIndicesList,
        indicesList,
        setIndicesList,
        indexComponents,
        setIndexComponents,
        indicesEndOfDayData,
        getIndicesEndOfDayData,
      }}
    >
      {props.children}
    </TaseContext.Provider>
  );
};

export default TaseContext;
