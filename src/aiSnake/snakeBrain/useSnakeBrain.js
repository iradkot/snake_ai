import _1 from "./versions/_1";
import {useEffect, useState} from "react";
import useDebounce from "../../hooks/useDebounce";
import _2 from "./versions/_2";
/**
 *
 * @param {'up'|'down'|'right'|'left'} key
 * @return {{keyCode: number}}
 */


/**
 *
 * @param snakeMovesStack
 * @param {direction} direction
 * @param {foodPosition} foodPosition
 * @param time
 * @param setSnakeMovesStack
 * @param { snakeArray } snakeArray
 * @return {{setIsSnakeBrainOn: (value: (((prevState: boolean) => boolean) | boolean)) => void, isSnakeBrainOn: boolean}}
 */
const useSnakeBrain = ({
                           snakeMovesStack,
                           direction,
                           time,
                           setSnakeMovesStack,
                           snakeArray,
                           foodPosition,
                       }) => {
    const [isSnakeBrainOn, setIsSnakeBrainOn] = useState(false);
    /*
        We use debounced time so that the brain start thinking right after all changes that happened every time has been done
    */
    const debouncedTime = useDebounce(time, 1);
    useEffect(() => {
        if (!isSnakeBrainOn) {
            return;
        }
        // _2({
        //     snakeMovesStack, direction, setSnakeMovesStack, snakeArray, foodPosition,
        //     isSnakeBrainOn, setIsSnakeBrainOn,
        // })
        _1({
            snakeMovesStack, direction, setSnakeMovesStack, snakeArray, foodPosition,
            isSnakeBrainOn, setIsSnakeBrainOn
        })
    }, [debouncedTime])
    return {isSnakeBrainOn, setIsSnakeBrainOn};
}

export default useSnakeBrain;
