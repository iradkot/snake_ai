import {PIXEL_SIZE, PIXELS_IN_ROW} from "../contexts/gameSettingsContext";
import {DIRECTIONS_VECTORS_MAP} from "./DIRECTIONS";


const STARTING_SNAKE_SIZE = Math.floor(PIXELS_IN_ROW);

/**
 *
 * @type {snakeArray}

 */
export const generatedStartingSnakeArray = [...new Array(STARTING_SNAKE_SIZE)].map((_, index) => ({
    x: PIXEL_SIZE * (STARTING_SNAKE_SIZE - index - 1),
    y: 0,
}));
// SnakeGame head is at place 0
const replaced_initial_state = {
    "snakeArray": [
        {
            "x": 40,
            "y": 120
        },
        {
            "x": 40,
            "y": 160
        },
        {
            "x": 40,
            "y": 200
        },
        {
            "x": 40,
            "y": 240
        },
        {
            "x": 40,
            "y": 280
        },
        {
            "x": 40,
            "y": 320
        },
        {
            "x": 40,
            "y": 360
        },
        {
            "x": 40,
            "y": 0
        },
        {
            "x": 40,
            "y": 40
        },
        {
            "x": 40,
            "y": 80
        },
        {
            "x": 80,
            "y": 80
        },
        {
            "x": 80,
            "y": 40
        },
        {
            "x": 80,
            "y": 0
        },
        {
            "x": 80,
            "y": 360
        },
        {
            "x": 80,
            "y": 320
        },
        {
            "x": 80,
            "y": 280
        },
        {
            "x": 80,
            "y": 240
        },
        {
            "x": 80,
            "y": 200
        },
        {
            "x": 80,
            "y": 160
        },
        {
            "x": 80,
            "y": 120
        },
        {
            "x": 120,
            "y": 120
        },
        {
            "x": 160,
            "y": 120
        },
        {
            "x": 200,
            "y": 120
        },
        {
            "x": 240,
            "y": 120
        },
        {
            "x": 280,
            "y": 120
        },
        {
            "x": 320,
            "y": 120
        },
        {
            "x": 360,
            "y": 120
        },
        {
            "x": 0,
            "y": 120
        },
        {
            "x": 0,
            "y": 160
        },
        {
            "x": 0,
            "y": 200
        }
    ],
    "direction": {
        "x": 0,
        "y": -40
    },
    "foodPosition": {
        "y": 160,
        "x": 120
    }
}


export const startingFoodVector = replaced_initial_state?.foodPosition || { x: PIXEL_SIZE * 2, y: PIXEL_SIZE * 2 };
export const startingDirectionVector = replaced_initial_state?.direction || DIRECTIONS_VECTORS_MAP.right;
export const startingSnakeArray = replaced_initial_state?.snakeArray.slice(10) || generatedStartingSnakeArray;

export const INITIAL_SNAKE_SPEED = 100; // also game speed
