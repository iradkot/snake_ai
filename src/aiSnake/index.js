import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import SnakeGame from './Snake';
import GameSettings from './GameSettings';
import {GameContextProvider} from "./contexts/gameContext";
import {GameSettingsContextProvider, MAP_WIDTH} from "./contexts/gameSettingsContext";
import {theme} from "../styles/theme";

const Container = styled.div`
  height: 100vh;
  place-items: center;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(2,auto);
  grid-template-rows: repeat(3, auto);
  padding: 100px;
  grid-template-areas:
               ".......  ......."
               "gameMap  gameSettings";
`;

const AiSnake = () => (
    <ThemeProvider theme={theme}>
        <Container>
            <GameContextProvider>
                <GameSettingsContextProvider>
                    <SnakeGame/>
                    <GameSettings/>
                </GameSettingsContextProvider>
            </GameContextProvider>
        </Container>
    </ThemeProvider>
);

export default AiSnake;
