import {sumVectors} from "../../utils/general";

/**
 *
 * @param snakeArray
 * @param currentDirection
 * @return {{x: *, y: *}}
 */
const getNextHeadPosition = (snakeArray, currentDirection) =>{
    const snakeHead = snakeArray[0];
    const nextHeadPositions = sumVectors(snakeHead, (currentDirection));
    return nextHeadPositions;
};

export default getNextHeadPosition
