import styled, {css} from "styled-components";
import React from "react";

export const Container = styled.div`
  display: grid;
  grid-area: gameMap;
`;
const ToolbarContainer = styled.div`
  width: auto;
  height: max-content;
  padding: 5px;
  background: linear-gradient(#ff9300, thistle);
  font-weight: bold;
  ${({isGameOn}) =>
    !isGameOn &&
    css`
            :hover {
              cursor: pointer;
              opacity: 0.8;
            }
          `};
`;
export const GameToolbar = ({title, gameStatus, gameData, startGameCb}) =>
    <ToolbarContainer gameStatus={gameStatus}
                      onClick={startGameCb}>{gameStatus.GAME_ON ? gameData : title}</ToolbarContainer>;
