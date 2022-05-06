/**
 * This funvtion
 * @param {snakeArray} snakeArray
 * @param {mapInfo} mapInfo
 * @returns {Array}
 */
const getAvailableSpaces = ({snakeArray, mapInfo}) => {
    const { PIXEL_SIZE, PIXELS_IN_ROW } = mapInfo;
    const columnIndexArray = [...new Array(PIXELS_IN_ROW)]
    const rowIndexArray = [...new Array(PIXELS_IN_ROW)]
    return columnIndexArray.reduce((acc, verticalRow, columnIndex) => {
        rowIndexArray.map((horizontalCell, rowIndex) => {
            const x = rowIndex * PIXEL_SIZE;
            const y = columnIndex * PIXEL_SIZE;
            if (!snakeArray.some((item) => item.x === x && item.y === y)) {
                acc.push({
                    y,
                    x,
                });
            }
        });
        return acc;
    }, []);
};

export default getAvailableSpaces;
