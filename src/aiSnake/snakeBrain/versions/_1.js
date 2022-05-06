import getNextHeadPosition from '../utils/getNextHeadPosition';
import {
    doesVectorArrayContainVector,
    getCollidingVectorInVectorArray,
    getDirectionOfSnakeVector,
    getIsDirectionVectorHorizontal,
    getOppositeDirectionString,
    sumVectors,
} from '../../utils/general';
import handleKeyPress from '../../utils/handleKeyPress';
import getKeyPressEventByKeyName from '../utils/getKeyPressEventByKeyName';
import {
    bottomStringifiedDirectionVector,
    DIRECTIONS_STRINGS,
    DIRECTIONS_VECTORS_MAP,
    leftStringifiedDirectionVector,
    rightStringifiedDirectionVector,
    upStringifiedDirectionVector,
} from '../../variables/DIRECTIONS';

const _1 = ({
                snakeMovesStack,
                direction,
                setSnakeMovesStack,
                snakeArray,
                foodPosition,
                isSnakeBrainOn,
                setIsSnakeBrainOn,
            }) => {
    const snakeHead = snakeArray[0];
    // const [newDirection, setNewDirection] = useState();
    /**
     * We activate logic every snake position
     */
    if (!isSnakeBrainOn) return;
    let newDirection;

    const handleCollisions = (
        isHorizontal,
        possibleNextDirections = Object.values(DIRECTIONS_STRINGS),
    ) => {
        const nextDirection = newDirection
            ? DIRECTIONS_VECTORS_MAP[newDirection]
            : snakeMovesStack[0] || direction;
        const nextHeadPosition = getNextHeadPosition(snakeArray, nextDirection);
        const nextCollidingVector = getCollidingVectorInVectorArray(snakeArray, nextHeadPosition);
        if (nextCollidingVector) {
            possibleNextDirections.splice(possibleNextDirections.indexOf());
            const direction = getDirectionOfSnakeVector(nextCollidingVector, snakeArray);
            newDirection = getOppositeDirectionString(direction);
            if (getIsDirectionVectorHorizontal(newDirection) === isHorizontal) {
                newDirection = isHorizontal ? 'up' : 'left';
                const nextHeadPosition = getNextHeadPosition(snakeArray, DIRECTIONS_VECTORS_MAP[newDirection]);
                const nextCollidingVector = getCollidingVectorInVectorArray(snakeArray, nextHeadPosition);
                if (nextCollidingVector) {
                    newDirection = getOppositeDirectionString(newDirection);
                    const nextHeadPosition = getNextHeadPosition(snakeArray, DIRECTIONS_VECTORS_MAP[newDirection]);
                    const nextCollidingVector = getCollidingVectorInVectorArray(snakeArray, nextHeadPosition);
                    if (nextCollidingVector)
                        newDirection = false
                }

            }
            const potentialNextHeadPosition = sumVectors(snakeHead, DIRECTIONS_VECTORS_MAP[newDirection]);
            if (doesVectorArrayContainVector(snakeArray, potentialNextHeadPosition)) {
                newDirection = isHorizontal ? 'up' : 'left';
                const nextHeadPosition = getNextHeadPosition(snakeArray, DIRECTIONS_VECTORS_MAP[newDirection]);
                const nextCollidingVector = getCollidingVectorInVectorArray(snakeArray, nextHeadPosition);
                if (nextCollidingVector) {
                    newDirection = getOppositeDirectionString(newDirection);
                    const nextHeadPosition = getNextHeadPosition(snakeArray, DIRECTIONS_VECTORS_MAP[newDirection]);
                    const nextCollidingVector = getCollidingVectorInVectorArray(snakeArray, nextHeadPosition);
                    if (nextCollidingVector)
                        newDirection = false

                }
            }
        }
    };

    switch (JSON.stringify(direction)) {
        case rightStringifiedDirectionVector:
        case leftStringifiedDirectionVector:
            if (foodPosition.x === snakeHead.x) {
                newDirection = foodPosition.y > snakeHead.y ? 'down' : 'up';
                const potentialNextHeadPosition = sumVectors(
                    snakeHead,
                    DIRECTIONS_VECTORS_MAP[newDirection],
                );
                if (doesVectorArrayContainVector(snakeArray, potentialNextHeadPosition)) {
                    // newDirection = undefined;
                    handleCollisions(true);
                }
            } else handleCollisions(true);
            break;
        case upStringifiedDirectionVector:
        case bottomStringifiedDirectionVector:
            if (foodPosition.y === snakeHead.y) {
                newDirection = foodPosition.x > snakeHead.x ? 'right' : 'left';
                const potentialNextHeadPosition = sumVectors(
                    snakeHead,
                    DIRECTIONS_VECTORS_MAP[newDirection],
                );
                if (doesVectorArrayContainVector(snakeArray, potentialNextHeadPosition)) {
                    // newDirection = undefined;
                    handleCollisions();
                }
            } else handleCollisions();
            break;
        default:
            return;
    }

    if (newDirection) {
        const keyDownEvent = getKeyPressEventByKeyName(newDirection);
        if (keyDownEvent) {
            handleKeyPress({keyDownEvent, snakeMovesStack, setSnakeMovesStack});
        }
    }

    return {isSnakeBrainOn, setIsSnakeBrainOn};
};

export default _1;
