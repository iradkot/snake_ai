/**
 * @typedef {{x: number, y: number}} vector
 */
/**
 * @typedef {vector} direction Represents the direction vector added to head
 */

/**
 * @typedef {vector} foodPosition Represents the food position vector
 */

/**
 * Game engine - controls of direction and live game data
 * @typedef {Object} gameEngineObject
 * @property {direction} direction
 * @property {function} setDirection
 *
 */

/**
 * Map info - object containing all mapInfo
 * @typedef {Object} mapInfo
 * @property {number} PIXEL_SIZE
 * @property {number} PIXELS_IN_ROW
 * @property {number} MAP_WIDTH pixel size double the pixels in a row
 * @property {number} MAP_HEIGHT pixel size double the pixels in a row
 */

/**
 * SnakeGame array - array containing snake positions
 * @typedef {{x: number, y: number}[]} snakeArray
 */
