import {doesVectorArrayContainVector, sumVectors} from "../utils/general";
import {DIRECTIONS_VECTORS_MAP} from "../variables/DIRECTIONS";

const checkIfNextCollide = (isHorizontal, newDirection, snakeArray, nextHeadPositions) => {
    if (doesVectorArrayContainVector(snakeArray, nextHeadPositions[0])) {
        newDirection = isHorizontal ? 'down' : 'right';
        const potentialNextHeadPosition = sumVectors(snakeHead, DIRECTIONS_VECTORS_MAP[newDirection])
        if (doesVectorArrayContainVector(snakeArray, potentialNextHeadPosition)) {
            newDirection = isHorizontal ? 'up' : 'left';
        }
    }
}
