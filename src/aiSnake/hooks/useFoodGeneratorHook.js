import {select} from "d3";
import {useCallback, useState} from "react";
import getAvailableSpaces from "../utils/getAvailableSpaces";
import {startingFoodVector} from "../variables/gameStartData";

/**
 *
 * @param {mapInfo} mapInfo
 * @param svgRef
 * @returns {{drawFood: ((function(): void)|*), setFoodPosition: (value: (((prevState: {x: number, y: number}) => {x: number, y: number}) | {x: number, y: number})) => void, generateNewFood: ((function(): void)|*), foodPosition: {x: number, y: number}}}
 */
const useFoodGeneratorHook = ({mapInfo, snakeArray, svgRef}) => {
    const { PIXEL_SIZE } = mapInfo;
    const [foodPosition, setFoodPosition] = useState(startingFoodVector);
    const drawFood = useCallback(() => {
        const svg = select(svgRef.current);
        svg
            .append('rect')
            .attr('id', 'food')
            .attr('height', PIXEL_SIZE)
            .attr('width', PIXEL_SIZE)
            .attr('fill', 'red')
            .attr('x', foodPosition.x)
            .attr('y', foodPosition.y)
            .style('z-index', 2);
    }, [foodPosition]);

    const generateNewFood = useCallback(() => {
        const availableSpaces = getAvailableSpaces({snakeArray, mapInfo});
        const selectedDot = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        setFoodPosition(selectedDot);
    }, [snakeArray]);

    return { foodPosition, setFoodPosition, drawFood, generateNewFood }
}

export default useFoodGeneratorHook;
