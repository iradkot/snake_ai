import {getCollidingVectorInVectorArray, sumVectors} from "./general";

const getDidSnackCollide = (snakeArray, newHeadPosition) => {
    return snakeArray.slice(0, snakeArray.length - 1).some((snakeBox, index) => {
        return snakeBox.x === newHeadPosition.x && snakeBox.y === newHeadPosition.y;
    });
}
export const handleSnakeMove = ({snakeArray, direction, foodPosition, generateNewFood, gameLost, isGameOn, setSnakeArray}) => {
    let newTail = false;
    let didSnakeCollide = false;
    const newSnakeArray = snakeArray.map((snakeVector, index, originalArray) => {
        if (index === 0) {
            /* We use the map width and height so that the snake can move without borders */
            const newHeadPosition = sumVectors(snakeVector, direction);
            if (newHeadPosition.x === foodPosition.x && newHeadPosition.y === foodPosition.y) {
                generateNewFood();
                newTail = originalArray[originalArray.length - 1];
            }
            didSnakeCollide = getDidSnackCollide(snakeArray, newHeadPosition);
            if (didSnakeCollide) {
                const collidingVector = getCollidingVectorInVectorArray(snakeArray, newHeadPosition);
            }
            return newHeadPosition;
        }
        return {
            x: originalArray[index - 1].x,
            y: originalArray[index - 1].y,
        };
    });
    // didSnakeCollide = getDidSnackCollide(snakeArray, newSnakeArray[0]);
    newTail && newSnakeArray.push(newTail);
    if (didSnakeCollide) {
        console.log('///// GAME LOST /////', {snakeArray, direction, foodPosition} )
        gameLost();
    }
    isGameOn && !didSnakeCollide && setSnakeArray(newSnakeArray);
}
