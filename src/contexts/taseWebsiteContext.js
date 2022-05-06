import React, { createContext, useState } from 'react';
import { uniqBy } from 'lodash';
import * as nodeServerRequests from '../api/nodeServer/requests';

import * as apiActions from '../api/requests';

import * as FirestoreService from '../firebase/firebase';
import { TA_35_OID } from '../constants/indexIds';
import { formatDateToOurDateFormat } from '../utils/dateAndTime';

const TaseWebsiteContext = createContext();

export const TaseWebsiteContextProvider = (props) => {
  const [ta35InDayData, setTa35InDayData] = useState([]);

  const getTa35InDayData = async (
    dateObject = { startDate: '2020-03-01', endDate: '2020-03-02' },
    tryCount = 0,
  ) => {
    if (tryCount > 0) throw new Error('error getting indicesEndOfDayData!');
    const { startDate, endDate } = dateObject;
    try {
      // const fireBaseResponse = await FirestoreService.getIndexInDayData({
      //   startDate: startDate,
      //   endDate: endDate,
      //   indexId: TA_35_OID,
      // });
      // if (!!fireBaseResponse) {
      //   // if got response
      //   // return setIndicesEndOfDayData(get(fireBaseResponse, 'indicesEndOfDay.result'));
      // }
      const { data } = await apiActions.getHistoryInDayFiles({
        oId: TA_35_OID,
        dFrom: formatDateToOurDateFormat(startDate),
        dTo: formatDateToOurDateFormat(endDate),
      });
      console.log({ data });
      data.Items.map(async ({ TradeDate, Link }) => {
        try {
          // const jsonArray = await getCsvAndReturnJson(Link);
          const response = await nodeServerRequests.getDayDataCSVToJSONParser(Link);
          // console.log({ TradeDate, jsonArray });
          await FirestoreService.addHistoricalInDayData(
            TA_35_OID,
            TradeDate,
            response.data.jsonData,
          );
        } catch (error) {
          console.log({ error });
        }
      });
      // console.log({ jsonResponse });
    } catch (error) {
      console.log({ error });
    }
    // FirestoreService.
  };
    
    const getDayDataValues = (dayData) => {
        return dayData.map(({ value }) => +value).reverse();
    };
    
    const getDayDataDates = (dayData) => {
        return dayData.map(({ time }) => time).reverse();
    };

  const getDayData = async (date) => {
    const resp = await FirestoreService.getInDayData(date);
    const dayDataArray = JSON.parse(resp.dayData);
    const filteredDayData = uniqBy(dayDataArray.filter(({ value, indexType }) => !!value && !indexType.includes('Theoretical')), item => item.time);
    return {values: getDayDataValues(filteredDayData), dates: getDayDataDates(filteredDayData)}
  };

  return (
    <TaseWebsiteContext.Provider
      value={{ ta35InDayData, getTa35InDayData, getDayDataValues, getDayDataDates, getDayData }}
    >
      {props.children}
    </TaseWebsiteContext.Provider>
  );
};

export default TaseWebsiteContext;
