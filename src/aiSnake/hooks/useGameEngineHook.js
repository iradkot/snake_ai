import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {GAME_STATUSES} from "../variables/GAME_STATUSES";
import gameSettingsContext from "../contexts/gameSettingsContext";

let moveTimeout;


/**
 *
 * @return {{isGameOn: boolean, gameStatus: string, startGame: ((function(): void)|*), stopGame: ((function(): void)|*), time: number}}
 */
const useGameEngineHook = () => {
    const {snakeSpeed} = useContext(gameSettingsContext);
    const [time, setTime] = useState(0);
    const [gameStatus, setIsGameOn] = useState(GAME_STATUSES.GAME_START);

    const isGameOn = useMemo(() => gameStatus === GAME_STATUSES.GAME_ON, [gameStatus]);

    const updateTime = useCallback(() => {
        setTime((prevState) => prevState + 1);
    }, [isGameOn]);


    const startGame = useCallback(() => {
        setIsGameOn(GAME_STATUSES.GAME_ON);
    }, []);
    const stopGame = useCallback(() => {
        setIsGameOn(GAME_STATUSES.GAME_START);
        setTime(0);

    }, []);

    useEffect(() => {
        moveTimeout = setTimeout(() => {
            isGameOn && updateTime();
            clearTimeout(moveTimeout);
        }, snakeSpeed);
        return () => clearTimeout(moveTimeout);
    }, [isGameOn, time]);
    return { startGame, stopGame, isGameOn, time, gameStatus };
}

export default useGameEngineHook;
