import React from 'react';
import { TaseContextProvider } from './taseContext';
import { TaseWebsiteContextProvider } from './taseWebsiteContext';
import { AlertContextProvider } from '../alerts/alertsContext';
import { GameContextProvider } from './gameContext';
import { GameDataContextProvider } from './gameDataContext';

const RootContext = (props) => {
  return (
    <AlertContextProvider>
      <TaseContextProvider>
        <TaseWebsiteContextProvider>
          <GameDataContextProvider>
          <GameContextProvider>{props.children}</GameContextProvider>
          </GameDataContextProvider>
        </TaseWebsiteContextProvider>
      </TaseContextProvider>
    </AlertContextProvider>
  );
};

export default RootContext;
