import { parse, format, getHours, getMinutes, getSeconds } from 'date-fns'

export const getParsedDateObject = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});

// func: parseIlDateStringToDateObject
// dateString: a string of date in israel format - day/month/year
export const parseIlDateStringToDateObject = (dateString) => {
     const dateObject = parse(dateString, 'dd/MM/yyyy', new Date());
     return getParsedDateObject(dateObject);
}

//TODO: check that it date change doesn't break the get function from tase
export const formatDateToOurDateFormat = (dateObject) => format(dateObject, 'yyyy-M-d');

export const timeStringToMilliseconds = (timeString) => {
    const firstThursdayTimeDate = parse(timeString, 'HH:mm:ss', new Date());
    const hours = getHours(firstThursdayTimeDate) * 60 * 60 * 1000;
    const minutes = getMinutes(firstThursdayTimeDate) * 60 * 1000;
    const seconds = getSeconds(firstThursdayTimeDate) * 1000;
    const timeToMill = hours + minutes + seconds;
    return timeToMill;
}

export const formatMilliToTimeString = (milli) => {
    const offset = new Date(milli).getTimezoneOffset() * 1000 * 60;
    return format(new Date(milli + offset), 'HH:mm:ss');
};
