import React from 'react';

import {ThemeProvider} from '@material-ui/core/styles';

import PytyperTheme from './theme';

import Wrapper from './Wrapper';

const App = () => {
  return (
    <ThemeProvider theme={PytyperTheme}>
      <Wrapper />
    </ThemeProvider>
  );
};

export default App;
