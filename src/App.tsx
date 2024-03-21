import React from 'react';
import ChooseLocation from './ChooseLocation/ChooseLocation';
import { AppContainer } from './App.styles';

export const App: React.FC<any> = () => {
  return (
    <AppContainer>
      <ChooseLocation />
    </AppContainer>
  );
};

export default App;
