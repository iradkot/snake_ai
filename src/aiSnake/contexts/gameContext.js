import React, {createContext, useState} from 'react';
import {startingDirectionVector, startingSnakeArray} from "../variables/gameStartData";
import {rightDirectionVector} from "../variables/DIRECTIONS";
import useLocalStorage from "../../hooks/useLocalStorage";

const GameContext = createContext(undefined, undefined);

export const GameContextProvider = (props) => {
    const [highScore, setHighScore] = useLocalStorage(`highScore`, 0);
    const [snakeArray, setSnakeArray] = useState(startingSnakeArray);
    const [direction, setDirection] = useState(startingDirectionVector);
    const [snakeMovesStack, setSnakeMovesStack] = useState([]);

    const handeNewDirection = (newDirection) => {
        setDirection(newDirection);
    };

    const handleChangeSnakeMovesStack = (e) => {
        setSnakeMovesStack(e);
    };

    return (
        <GameContext.Provider value={{
            snakeArray, setSnakeArray,
            direction, setDirection: handeNewDirection,
            snakeMovesStack, setSnakeMovesStack: handleChangeSnakeMovesStack,
            highScore, setHighScore
        }}>
            {props.children}
        </GameContext.Provider>
    )
};

export default GameContext;
