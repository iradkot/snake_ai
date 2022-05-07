import React, {createContext, useCallback, useState} from "react";
import {INITIAL_SNAKE_SPEED} from "../variables/gameStartData";

export const PIXEL_SIZE = 40;
export const PIXELS_IN_ROW = 10;
export const MAP_WIDTH = PIXEL_SIZE * PIXELS_IN_ROW;
// noinspection JSSuspiciousNameCombination
export const MAP_HEIGHT = MAP_WIDTH;
export const MAX_MOVES_STACK = 1; // maximum moves allowed to be saved, after that number any direction request will be ignored (so that we can press top right fast and it will save the right and wont ignore it)
/**
 * MAP_SIZE_INFO
 * @type {mapInfo} MAP_SIZE_INFO
 */
export const MAP_SIZE_INFO = {
    PIXEL_SIZE,
    PIXELS_IN_ROW,
    MAP_WIDTH,
    MAP_HEIGHT,
};

const GameSettingsContext = createContext(undefined, undefined);

const speedUnit = 1.5

export const GameSettingsContextProvider = (props) => {
    const [mapSizeInfo, setMapSizeInfo] = useState(MAP_SIZE_INFO);
    const [snakeSpeed, setSnakeSpeed] = useState(INITIAL_SNAKE_SPEED);

    const changeSnakeSpeed = (newSpeed) => setSnakeSpeed(newSpeed);
    const increaseGameSpeed = useCallback(() => {
        changeSnakeSpeed(snakeSpeed / speedUnit);
    }, [snakeSpeed])
    const decreaseGameSpeed = () => {
        changeSnakeSpeed(snakeSpeed * speedUnit);
    }


    return (
        <GameSettingsContext.Provider value={{
            snakeSpeed,
            changeSnakeSpeed,
            increaseGameSpeed,
            decreaseGameSpeed,
            mapSizeInfo,
            setMapSizeInfo

        }}>
            {props.children}
        </GameSettingsContext.Provider>
    )
};

export default GameSettingsContext;
