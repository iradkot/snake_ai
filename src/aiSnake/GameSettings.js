import React, {useContext} from "react";
import styled from 'styled-components';
import gameSettingsContext, {MAP_SIZE_INFO} from "./contexts/gameSettingsContext";
import {AppButton} from "../components/Button";
import useLocalStorage from "../hooks/useLocalStorage";
import GameContext from "./contexts/gameContext";

const Container = styled.div`
  box-shadow: -4px -3px 45px 21px rgb(0 0 0 / 35%);
  border: green 16px solid;
  border-radius: 50px;
  display: grid;
  background: ${({ theme }) => theme.main} 50%; 
  grid-area: gameSettings;
  min-width: 200px;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.getSpacing(4)};
`;

const SettingsTitle = styled.div`
    ${({ theme }) => theme.headerStyle1};
`;
const SettingsLine = styled.div`
    ${({ theme }) => theme.textDefault};
`;

const GameSettings = (props) => {
    const {highScore, snakeArray} = useContext(GameContext);
    const {snakeSpeed,decreaseGameSpeed, increaseGameSpeed} = useContext(gameSettingsContext);
    return (
        <Container>
            <SettingsTitle>Settings:</SettingsTitle>
            <SettingsTitle>currentScore: {snakeArray.length}</SettingsTitle>
            <SettingsTitle>Highcscore: {highScore}</SettingsTitle>
            <SettingsLine>gameSpeed: {Math.floor(snakeSpeed)} </SettingsLine>
            <AppButton onClick={increaseGameSpeed}>
                Increase speed (Press ',' or {">"})
            </AppButton>
            <AppButton onClick={decreaseGameSpeed}>
                Decrease speed (Press '.' or {"<"})
            </AppButton>
        </Container>
    )
}

export default GameSettings;
