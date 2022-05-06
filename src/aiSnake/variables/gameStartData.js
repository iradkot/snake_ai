import {PIXEL_SIZE, PIXELS_IN_ROW} from "../contexts/gameSettingsContext";
import {DIRECTIONS_VECTORS_MAP} from "./DIRECTIONS";


const STARTING_SNAKE_SIZE = Math.floor(PIXELS_IN_ROW);

/**
 *
 * @type {snakeArray}

 */
export const startingSnakeArray = [...new Array(STARTING_SNAKE_SIZE)].map((_, index) => ({
    x: PIXEL_SIZE * (STARTING_SNAKE_SIZE - index - 1),
    y: 0,
}));
// SnakeGame head is at place 0

export const startingFoodVector = { x: PIXEL_SIZE * 2, y: PIXEL_SIZE * 2 };
export const startingDirection = DIRECTIONS_VECTORS_MAP.right;

export const INITIAL_SNAKE_SPEED = 100; // also game speed
