import getNextHeadPosition from "../utils/getNextHeadPosition";
import {getCollidingVectorInVectorArray, getIsDirectionVectorHorizontal, minusVectors} from "../../utils/general";
import handleKeyPress from "../../utils/handleKeyPress";
import getKeyPressEventByKeyName from "../utils/getKeyPressEventByKeyName";
import getDirectionVectorsObject from "../utils/directionsUtils/getDirectionVectorsObject";
import {isEqual} from "lodash/lang";
import getSortedDirectionByPriority from "../utils/directionsUtils/getSortedDirectionByPriority";
import {isEmpty} from "lodash";
import {
    DIRECTIONS_STRINGS,
    DIRECTIONS_VECTORS_MAP,
    directionVectorToDirectionKey
} from "../../variables/DIRECTIONS";

/**
 *
 * @param newDirectionKey
 */
const setNewDirection = (newDirectionKey, snakeMovesStack, setSnakeMovesStack) => {
    const keyDownEvent = getKeyPressEventByKeyName(newDirectionKey)
    if (keyDownEvent) {
        handleKeyPress({
            keyDownEvent, snakeMovesStack, setSnakeMovesStack
        })
    }
}

const _2 = ({
                snakeMovesStack,
                direction: currentDirectionVector,
                setSnakeMovesStack,
                snakeArray,
                foodPosition,
                isSnakeBrainOn,
                setIsSnakeBrainOn
            }) => {


    const nextDirectionVector = snakeMovesStack[0] || currentDirectionVector;
    const currentDirectionKey = directionVectorToDirectionKey(nextDirectionVector)

    /**
     * We activate logic every snake position
     */
        if (!isSnakeBrainOn) return {isSnakeBrainOn, setIsSnakeBrainOn};
        // we start with an object with all directions(x, y, and direction priority) and remove all direction we dont want to go to,
        // eventually the remaining direction / Th direction with the highest priority will be the direction we will go with
        const availableNextDirections = getDirectionVectorsObject()
        const currentDirectionPriority = 1;

        availableNextDirections[currentDirectionKey].priority = currentDirectionPriority;

        const removeDirectionByKey = (directionToRemoveKey) => {
            delete availableNextDirections[directionToRemoveKey]
        }
        // 1. first we remove the direction to the snake 'neck'
        const headPosition = snakeArray[0];
        const neckPosition = snakeArray[1];
        const directionToNeck = minusVectors(neckPosition, headPosition);
        removeDirectionByKey(directionVectorToDirectionKey(directionToNeck))

    // 2. Then We check the rest of the available directions if they will lead to collision
    Object.values(availableNextDirections).forEach(directionObject => {
        const nextHeadPosition = getNextHeadPosition(snakeArray, directionObject)
        // Here we remove the tail since next turn it will move (slice(0,-1))
        const isDirectionCollide = getCollidingVectorInVectorArray(snakeArray.slice(0, -1), nextHeadPosition);
        if (isDirectionCollide) {
            removeDirectionByKey(directionVectorToDirectionKey(nextDirectionVector))
        }
    })
    if (!isEmpty(availableNextDirections)) {
        const newNextDirectionVector = getSortedDirectionByPriority(availableNextDirections)[0];
        if (!isEqual(nextDirectionVector, {x: newNextDirectionVector.x, y: newNextDirectionVector.y})) {
            setNewDirection(newNextDirectionVector.key, snakeMovesStack, setSnakeMovesStack);
        }
    }

    return {isSnakeBrainOn, setIsSnakeBrainOn}
};

export default _2;
