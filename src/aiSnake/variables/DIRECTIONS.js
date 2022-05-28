import {PIXEL_SIZE} from "../contexts/gameSettingsContext";

export const leftDirectionVector = {x: -PIXEL_SIZE, y: 0};
export const upDirectionVector = {x: 0, y: -PIXEL_SIZE};
export const rightDirectionVector = {x: PIXEL_SIZE, y: 0};
export const bottomDirectionVector = {x: 0, y: PIXEL_SIZE};

export const getDirectionsArray = () => [
    leftDirectionVector,
    upDirectionVector,
    rightDirectionVector,
    bottomDirectionVector
];

const LEFT = 'left';
const UP = 'up';
const RIGHT = 'right';
const DOWN = 'down';
export const DIRECTIONS_STRINGS = {
    LEFT,
    UP,
    RIGHT,
    DOWN,
};
/**
 *
 * @typedef {object} directionVectorsObject
 * @property {direction} left
 * @property {direction} up
 * @property {direction} right
 * @property {direction} down
 */
export const DIRECTIONS_VECTORS_MAP = {
    [LEFT]: leftDirectionVector,
    [UP]: upDirectionVector,
    [RIGHT]: rightDirectionVector,
    [DOWN]: bottomDirectionVector,
};
export const leftStringifiedDirectionVector = JSON.stringify(leftDirectionVector);
export const upStringifiedDirectionVector = JSON.stringify(upDirectionVector);
export const rightStringifiedDirectionVector = JSON.stringify(rightDirectionVector);
export const bottomStringifiedDirectionVector = JSON.stringify(bottomDirectionVector);
const stringifyDirectionVectorsToVectors = {
    [leftStringifiedDirectionVector]: DIRECTIONS_VECTORS_MAP[LEFT],
    [upStringifiedDirectionVector]: DIRECTIONS_VECTORS_MAP[UP],
    [rightStringifiedDirectionVector]: DIRECTIONS_VECTORS_MAP[RIGHT],
    [bottomStringifiedDirectionVector]: DIRECTIONS_VECTORS_MAP[DOWN],
};
const stringifiedDirectionVectorsToDirectionKeys = {
    [leftStringifiedDirectionVector]: LEFT,
    [upStringifiedDirectionVector]: UP,
    [rightStringifiedDirectionVector]: RIGHT,
    [bottomStringifiedDirectionVector]: DOWN,
};
export const directionVectorToDirectionKey = (directionVector) => {
    return stringifiedDirectionVectorsToDirectionKeys[JSON.stringify(directionVector)];
};
export const directionVectorToString = (directionVector) =>
    stringifyDirectionVectorsToVectors[JSON.stringify(directionVector)];
