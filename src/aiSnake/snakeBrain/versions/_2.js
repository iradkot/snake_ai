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
    directionVectorToDirectionKey, getDirectionsArray
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

    // 2. Remove all directions that lead to collision
    Object.values(availableNextDirections).forEach(directionObject => {
        const nextHeadPosition = getNextHeadPosition(snakeArray, directionObject)
        // Here we remove the tail since next turn it will move (slice(0,-1))
        const collidingVector = getCollidingVectorInVectorArray(snakeArray.slice(0, -1), nextHeadPosition);
        if (collidingVector) {
            removeDirectionByKey(directionObject.key)
        }
    })

    // 3. What is the shortest clear route to the food, and we add priority based on shortest route
    const foodPriority = 1.5
    if (foodPosition.x === headPosition.x) {
        if (foodPosition.y > headPosition.y) {
            availableNextDirections.down && (availableNextDirections.down.priority += foodPriority);
        } else {
            availableNextDirections.up && (availableNextDirections.up.priority += foodPriority);
        }
    }
    if (foodPosition.y === headPosition.y) {
        if (foodPosition.x > headPosition.x) {
            availableNextDirections.right && (availableNextDirections.right.priority += foodPriority);
        }
        else {
            availableNextDirections.left && (availableNextDirections.left.priority += foodPriority);
        }
    }

    // 4. Reduce priority of all directions that are closer to part of the snake after one step
    Object.values(availableNextDirections).forEach(directionObject => {
        const nextHeadPosition = getNextHeadPosition(snakeArray, directionObject)
        let collides = 0
        const directionsArray = getDirectionsArray()
        directionsArray.forEach(directionVectorObject => {
            const secondNextHeadPosition = getNextHeadPosition([nextHeadPosition, snakeArray], directionVectorObject)
            // Count amount of directions that lead to collision
            const collidingVector = getCollidingVectorInVectorArray([nextHeadPosition, snakeArray], secondNextHeadPosition);
            if (collidingVector) {
                collides++;
            }
        })
        directionObject.priority -= (collides * 2);
    })

    // 5. Reduce priority of all directions that are closer to part of the snake after two steps
    Object.values(availableNextDirections).forEach(directionObject => {
        const nextHeadPosition = getNextHeadPosition(snakeArray, directionObject)
        let collides = 0
        Object.values(DIRECTIONS_VECTORS_MAP).forEach(directionVectorObject => {
            const secondNextHeadPosition = getNextHeadPosition([nextHeadPosition, snakeArray], directionVectorObject)
            Object.values(DIRECTIONS_VECTORS_MAP).forEach(directionVectorObject => {
                const thirdNextHeadPosition = getNextHeadPosition([nextHeadPosition, secondNextHeadPosition, snakeArray], directionVectorObject)
                // Count amount of directions that lead to collision
                const collidingVector = getCollidingVectorInVectorArray([nextHeadPosition, secondNextHeadPosition, snakeArray], thirdNextHeadPosition);
                if (collidingVector) {
                    collides++;
                }
            })
        })
        console.log('5', collides)
        directionObject.priority -= (collides * 1.75);
    });

    // 6. Reduce priority of all directions that are closer to part of the snake after three steps
    Object.values(availableNextDirections).forEach(directionObject => {
        const nextHeadPosition = getNextHeadPosition(snakeArray, directionObject)
        let collides = 0
        Object.values(DIRECTIONS_VECTORS_MAP).forEach(directionVectorObject => {
            const secondNextHeadPosition = getNextHeadPosition([nextHeadPosition, snakeArray], directionVectorObject)
            Object.values(DIRECTIONS_VECTORS_MAP).forEach(directionVectorObject => {
                const thirdNextHeadPosition = getNextHeadPosition([nextHeadPosition, secondNextHeadPosition, snakeArray], directionVectorObject)
                Object.values(DIRECTIONS_VECTORS_MAP).forEach(directionVectorObject => {
                    const fourthNextHeadPosition = getNextHeadPosition([nextHeadPosition, secondNextHeadPosition, thirdNextHeadPosition, snakeArray], directionVectorObject)
                    // Count amount of directions that lead to collision
                    const collidingVector = getCollidingVectorInVectorArray([nextHeadPosition, secondNextHeadPosition, thirdNextHeadPosition, snakeArray], fourthNextHeadPosition);
                    if (collidingVector) {
                        collides++;
                    }
                })
            })
        })
        console.log('6', collides)
        directionObject.priority -= (collides * 1.5);
    });

    if (!isEmpty(availableNextDirections)) {
        const newNextDirectionVector = getSortedDirectionByPriority(availableNextDirections)[0];
        if (!isEqual(nextDirectionVector, {x: newNextDirectionVector.x, y: newNextDirectionVector.y})) {
            setNewDirection(newNextDirectionVector.key, snakeMovesStack, setSnakeMovesStack);
        }
    }

    return {isSnakeBrainOn, setIsSnakeBrainOn}
};

export default _2;
