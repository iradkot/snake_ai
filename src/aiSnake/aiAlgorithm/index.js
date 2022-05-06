import KeyCodes from 'utils/KeyCodes';
import {INITIAL_SNAKE_SPEED} from "../variables/gameStartData";

class SnakeBrain {
  constructor() {

  }
}

const calculateNextMove = (mapSize, snakeArray, foodLocation) => {
  return Math.random() > 0.5 ? KeyCodes.down : KeyCodes.right
}

let isSnakeBrainOn = false; // if false it means interval is off;
let brainIntervalRepeats = 0; // starts at 0 at every interval creation - counts number of time interval occurred
const startBrainInterval = (callback, interval) => {
  isSnakeBrainOn = setInterval(() => {
    callback();
    ++brainIntervalRepeats;
    }, interval);
}

const stopBrainInterval = () => {
  clearInterval(isSnakeBrainOn);
  isSnakeBrainOn = false;
  brainIntervalRepeats = 0;
}

const StartSnakeBrain = ({snakePosition}) => {
  startBrainInterval(() => {
    calculateNextMove();
    // simulateKey(38, "up");
    if(brainIntervalRepeats > 10) stopBrainInterval()
  }, INITIAL_SNAKE_SPEED)
};

export default StartSnakeBrain;
