import KeyCodes from "../../utils/KeyCodes";
import gameSettingsContext, {MAX_MOVES_STACK} from "../contexts/gameSettingsContext";
import {useContext} from "react";
import {
    bottomDirectionVector,
    leftDirectionVector,
    rightDirectionVector,
    upDirectionVector
} from "../variables/DIRECTIONS";

const handleKeyPress = ({keyDownEvent, snakeMovesStack, isGameOn = true, toggleStartAndStopGame, setSnakeMovesStack, resetGame, increaseGameSpeed, decreaseGameSpeed}) => {
    if (snakeMovesStack.length >= MAX_MOVES_STACK) return;
    switch (keyDownEvent.keyCode) {
        case KeyCodes.space: // space
        case KeyCodes.enter:// enter
            toggleStartAndStopGame();
            break;
        case KeyCodes.left: // left
            setSnakeMovesStack([...snakeMovesStack, leftDirectionVector]);
            break;
        case KeyCodes.up: //up
            setSnakeMovesStack([...snakeMovesStack, upDirectionVector]);
            break;
        case KeyCodes.right: // right
            setSnakeMovesStack([...snakeMovesStack, rightDirectionVector]);
            break;
        case KeyCodes.down: // down
            setSnakeMovesStack([...snakeMovesStack, bottomDirectionVector]);
            break;
        case KeyCodes.esc: // down
            resetGame();
            break;
        case KeyCodes.decreaseSpeed: // down
            decreaseGameSpeed && decreaseGameSpeed();
            break;
        case KeyCodes.increaseSpeed: // down
            increaseGameSpeed && increaseGameSpeed();
            break;
        default:
            break;
    }
}

export default handleKeyPress;
