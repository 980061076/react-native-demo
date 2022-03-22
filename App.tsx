import MyNavigation from 'Navigation';
import React from 'react';
import { RecoilRoot} from 'recoil';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {

  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <MyNavigation/>
      </PaperProvider>
    </RecoilRoot>
  );
};

export default App;
