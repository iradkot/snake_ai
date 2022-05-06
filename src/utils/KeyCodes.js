import {DIRECTIONS_STRINGS} from "../aiSnake/variables/DIRECTIONS";

/**
 *
 * @type {{left: number, up: number, right: number, enter: number, down: number, space: number}}
 */
const keyCodes = {
  [DIRECTIONS_STRINGS.LEFT]: 37,
  [DIRECTIONS_STRINGS.UP]: 38,
  [DIRECTIONS_STRINGS.RIGHT]: 39,
  [DIRECTIONS_STRINGS.DOWN]: 40,
  space: 13,
  enter: 32,
  esc: 27,
  decreaseSpeed: 188,
  increaseSpeed: 190,
}

export default keyCodes;
