import React, {useCallback, useContext, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {select} from 'd3';
import {GAME_STATUSES} from "./variables/GAME_STATUSES";
import useFoodGeneratorHook from "./hooks/useFoodGeneratorHook";
import useGameEngineHook from "./hooks/useGameEngineHook";
import {handleSnakeMove} from "./utils/handleSnakeMove";
import handleKeyPress from "./utils/handleKeyPress";
import {Container, GameToolbar} from "./styles";
import GameContext from "./contexts/gameContext";
import useSnakeBrain from "./snakeBrain/useSnakeBrain";
import gameSettingsContext, {MAP_SIZE_INFO} from "./contexts/gameSettingsContext";
import {startingDirectionVector, startingFoodVector, startingSnakeArray} from "./variables/gameStartData";


GameToolbar.propTypes = {
    gameStatus: PropTypes.oneOf(Object.values(GAME_STATUSES)),
    gameData: PropTypes.node,
    startGameCb: PropTypes.func
}

const Snake = () => {
    const {snakeSpeed, decreaseGameSpeed, increaseGameSpeed} = useContext(gameSettingsContext);
    const gameContext = useContext(GameContext);
    const {
        snakeArray, setSnakeArray,
        direction, setDirection,
        snakeMovesStack, setSnakeMovesStack,
        highScore, setHighScore
    } = gameContext;

    const svgRef = useRef(null);
    const {foodPosition, setFoodPosition, drawFood, generateNewFood} = useFoodGeneratorHook({
        mapInfo: MAP_SIZE_INFO,
        svgRef,
        snakeArray
    })
    const {startGame, stopGame, isGameOn, time, gameStatus} = useGameEngineHook();

    const updateSnakePosition = () => {
        handleSnakeMove({
            snakeArray,
            setSnakeArray,
            isGameOn,
            direction,
            foodPosition,
            gameLost,
            generateNewFood,
        });
    };
    const {isSnakeBrainOn, setIsSnakeBrainOn} = useSnakeBrain({
        snakeArray,
        setSnakeArray,
        direction,
        setDirection,
        snakeMovesStack,
        setSnakeMovesStack,
        isGameOn,
        foodPosition,
        generateNewFood,
        time
    });

    useEffect(() => {
        if (snakeMovesStack.length > 0) {
            const nextMove = snakeMovesStack[0];
            // In case the snake is moving in the opposite direction then current direction (Meaning the snake is going backwards while it should not)
            if ((nextMove.x + direction.x) === 0 || (nextMove.y + direction.y) === 0) {
                return;
            }
            setDirection(nextMove)
        }
    }, [time, snakeMovesStack.length])
    // each second (as long as game is on, we want to update snack position)
    useEffect(() => {
        if (time == 0) {
            return;
        }
        updateSnakePosition();
        if (snakeMovesStack.length > 0) snakeMovesStack.shift()
    }, [time])


    const gameData = useMemo(() => `score: ${snakeArray.length}, time: ${Math.floor(time / (1000 / snakeSpeed))}`, [snakeArray.length, time]);

    const resetGame = ({score}) => {
        const newHighScore = score > highScore;
        if (newHighScore) setHighScore(snakeArray.length);
        stopGame();

        setTimeout(() => {
            setSnakeArray(startingSnakeArray);
            setDirection(startingDirectionVector);
            setSnakeMovesStack([]);
            setFoodPosition(startingFoodVector);
            generateNewFood();
            if (score > highScore) {
                alert(`New high score: ${score}`);
            } else {
                alert(`Game Over! Your score is ${score}!`);
            }
            // startGame();
        }, 100);

    }
    const toggleStartAndStopGame = () => {
        isGameOn ? stopGame() : startGame();
    }


    const gameLost = useCallback(() => {
        resetGame({score: snakeArray.length});
        // alert(newHighScore ? `New high score!! ${gameData}` : `you lost... Ehm.. LOSER!! That's you'r game data: ${gameData}`);
    }, [gameData]);
    const handleKeyDown = (keyDownEvent) => {
        keyDownEvent.preventDefault();
        keyDownEvent.stopPropagation();
        handleKeyPress({
            keyDownEvent,
            snakeMovesStack,
            isGameOn,
            toggleStartAndStopGame,
            setSnakeMovesStack,
            resetGame,
            decreaseGameSpeed,
            increaseGameSpeed
        })
    };

    const drawCanvas = useCallback(() => {
        select(svgRef.current)
            .attr('height', MAP_SIZE_INFO.MAP_HEIGHT + MAP_SIZE_INFO.AXIS_BOX_SIZE)
            .attr('width', MAP_SIZE_INFO.MAP_WIDTH + MAP_SIZE_INFO.AXIS_BOX_SIZE)
            .style('background', 'black')
            .style('stroke', 'white');
    }, [svgRef]);

    const xGrid = [...Array(MAP_SIZE_INFO.MAP_WIDTH / MAP_SIZE_INFO.PIXEL_SIZE + 1).keys()].map(x => ({
        x: x * MAP_SIZE_INFO.PIXEL_SIZE,
        y: MAP_SIZE_INFO.MAP_HEIGHT
    }));

    const yGrid = [...Array(MAP_SIZE_INFO.MAP_HEIGHT / MAP_SIZE_INFO.PIXEL_SIZE + 1).keys()].map(y => ({
        x: MAP_SIZE_INFO.MAP_WIDTH,
        y: y * MAP_SIZE_INFO.PIXEL_SIZE,
    }));

    console.log({ yGrid, xGrid });

    const drawGrid = useCallback(() => {
        const svg = select(svgRef.current);
        const appendCommonGridAttrs = (svgRef) =>
            svgRef.attr('id', 'grid')
                .attr('stroke-width', 1)
                .attr('height', MAP_SIZE_INFO.PIXEL_SIZE)
                .attr('width', MAP_SIZE_INFO.PIXEL_SIZE)
                .style('stroke', 'white')
                .style("color", "white")
                .style('font-size', '14px')
                .style("text-anchor", "middle")
                .style("dominant-baseline", "central")
                .style('font-family', 'monospace');

        // const textXOffset = 0;
        const textXOffset = MAP_SIZE_INFO.PIXEL_SIZE / 2;
        const textYOffset = MAP_SIZE_INFO.PIXEL_SIZE / 2;
        // const textYOffset = 0

        yGrid.forEach(({x, y}) => {
            appendCommonGridAttrs(svg.append('rect').attr('x', x).attr('y', y));
            appendCommonGridAttrs(svg.append('text').attr('x', x + textXOffset).attr('y', y + textYOffset ).text(y));
        });

        xGrid.forEach(({x, y}) => {
            appendCommonGridAttrs(svg.append('rect').attr('x', x).attr('y', y));
            appendCommonGridAttrs(svg.append('text').attr('x', x + textXOffset).attr('y', y + textYOffset )).text(x);
            // svg.append('rect')
            //     .attr('id', 'grid')
            //     .attr('height', MAP_SIZE_INFO.PIXEL_SIZE)
            //     .attr('width', MAP_SIZE_INFO.PIXEL_SIZE)
            //     .attr('x', x)
            //     .attr('y', y)
            //     .style('z-index', 20)
            //     .style('stroke', 'red')
            //     .style('z-index', 20)
            //     .append("text")
            //     .attr("x", x)
            //     .attr("y", y)
            //     .attr('height', MAP_SIZE_INFO.PIXEL_SIZE)
            //     .attr('width', MAP_SIZE_INFO.PIXEL_SIZE)
            //     .attr("dy", ".35em")
            //     .style("text-anchor", "middle")
            //     .style("color", "white")
            //     .text(`${x}, ${y}`)
            //     .style('z-index', 20);
        })
    }, [xGrid, svgRef]);

    const drawSnake = useCallback(() => {
        const svg = select(svgRef.current);
        svg
            .selectAll('rect')
            .filter(function () {
                return this.id !== 'grid'
            })
            .data(snakeArray)
            .join(
                (enter) =>
                    enter
                        .append('rect')
                        .attr('height', MAP_SIZE_INFO.PIXEL_SIZE)
                        .attr('width', MAP_SIZE_INFO.PIXEL_SIZE)
                        .attr('fill', 'green')
                        .attr('x', (d) => d.x)
                        .attr('y', (d) => d.y),
                (update) =>
                    update
                        .attr('x', (d) => d.x)
                        .attr('y', (d) => d.y)
                        .style('z-index', 4)
                        .attr('fill', (_, index) => (index === 0 ? 'green' : 'yellow'))
                        .style('stroke', 'red')
            );
        drawFood();
    }, [snakeArray]);

    //draw first screen
    useEffect(() => {
        // new D3Chart(chartRef.current);
        drawCanvas();
        drawGrid();
        drawSnake();
        drawFood();
    }, [svgRef]);
    // snake movement handle
    useEffect(() => {
        drawSnake();
    }, [snakeArray]);

    const gameStat = isGameOn ? 'on' : 'off'
    const BrainStat = isSnakeBrainOn ? 'on' : 'off'
    return (
        <Container role={'button'} tabIndex={'0'} onKeyDown={handleKeyDown}>
                <GameToolbar title={isGameOn ? `Stop game(${gameStat})` : `Start game(${gameStat})`}
                             startGameCb={toggleStartAndStopGame} gameData={gameData} gameStatus={gameStatus}/>
                <GameToolbar title={`Start-Brain(${BrainStat})`} startGameCb={() => setIsSnakeBrainOn(!isSnakeBrainOn)}
                             gameData={gameData} gameStatus={gameStatus}/>
                <svg ref={svgRef}/>
        </Container>
    );
};

export default Snake;
