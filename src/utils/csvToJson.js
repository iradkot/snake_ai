import axios from 'axios';

export const getCsvAndReturnJson = async (
  csvUrl
) => {
    try {
        const response = await axios({
            url: csvUrl,
            method: 'GET',
            responseType: 'blob', // important
        });
        const responseText = await response.data.text();
        const stringsArray = responseText.split('\n');
        return stringsArray.map(string => ({
            date: string.slice(0, 10),
            time: string.slice(11, 19),
            value: string.slice(20, 27),
            change: string.slice(string.length - 6, string.length),
            indexType: string.slice(28, string.length - 7)
        }));
    } catch (error) {
        console.log({ error });
        throw error
    }
};
