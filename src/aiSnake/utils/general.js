import isEqual from "lodash/isEqual";
import {MAP_HEIGHT, MAP_WIDTH, PIXEL_SIZE} from "../contexts/gameSettingsContext";
import {DIRECTIONS_STRINGS, DIRECTIONS_VECTORS_MAP} from "../variables/DIRECTIONS";

/**
 *
 * @param {vector} snakeHeadVector
 * @param {vector} directionVector
 * @return {{x: *, y: *}}
 */
export const sumVectors = (snakeHeadVector, directionVector) => ({
    x: (MAP_WIDTH + snakeHeadVector.x + directionVector.x) % MAP_WIDTH,
    y: (MAP_HEIGHT + snakeHeadVector.y + directionVector.y) % MAP_HEIGHT,
})

export const minusVectors = (vector1, vector2) => {
    let newX = vector1.x - vector2.x;
    let newY = vector1.y - vector2.y;

    if (Math.abs(newX) > PIXEL_SIZE) {
        newX += newX > 0 ? -MAP_WIDTH : MAP_WIDTH;
    }
    if (Math.abs(newY) > PIXEL_SIZE) {
        newY += newY > 0 ? -MAP_HEIGHT : MAP_HEIGHT;
    }
    return ({
        x: newX,
        y: newY,
    });
}

export const doesVectorArrayContainVector = (vectorArray, vector) => {
    return vectorArray.some(vectorArrayInstance => isEqual(vectorArrayInstance, vector))
}

/**
 *
 * @param vectorArray
 * @param vectorToCollide
 * @return {*}
 */
export const getCollidingVectorInVectorArray = (vectorArray, vectorToCollide) => {
    return vectorArray.find(vectorArrayInstance => isEqual(vectorArrayInstance, vectorToCollide))
}

/**
 * This functin gets the current direction of a snake vector(except for the head which his direction may change at any moment).
 * @param {vector} targetSnakeVector
 * @param {snakeArray} snakeArray
 * @return {string}
 */
export const getDirectionOfSnakeVector = (targetSnakeVector, snakeArray) => {
    const targetSnakeVectorIndex = snakeArray.findIndex(snakeVector => isEqual(snakeVector, targetSnakeVector));
    const nextVectorPosition = snakeArray[targetSnakeVectorIndex - 1];
    const vectorDirection = minusVectors(nextVectorPosition, targetSnakeVector);
    if (vectorDirection.x > PIXEL_SIZE) return DIRECTIONS_STRINGS.LEFT;
    if (vectorDirection.x < -PIXEL_SIZE) return DIRECTIONS_STRINGS.RIGHT;
    if (vectorDirection.y < -PIXEL_SIZE) return DIRECTIONS_STRINGS.DOWN;
    if (vectorDirection.y < -PIXEL_SIZE) return DIRECTIONS_STRINGS.UP;
    return Object.keys(DIRECTIONS_VECTORS_MAP).find(direction => isEqual(DIRECTIONS_VECTORS_MAP[direction], vectorDirection))
}

export const getOppositeDirectionString = (directionString) => {
    const oppositesDirectionObject = {
        [DIRECTIONS_STRINGS.LEFT]: DIRECTIONS_STRINGS.RIGHT,
        [DIRECTIONS_STRINGS.RIGHT]: DIRECTIONS_STRINGS.LEFT,
        [DIRECTIONS_STRINGS.UP]: DIRECTIONS_STRINGS.DOWN,
        [DIRECTIONS_STRINGS.DOWN]: DIRECTIONS_STRINGS.UP,
    }
    return oppositesDirectionObject[directionString]
}

export const getIsDirectionVectorHorizontal = (direction) => [DIRECTIONS_VECTORS_MAP.left, DIRECTIONS_VECTORS_MAP.right].includes(direction);
