import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';

import PytyperTheme from './theme';

import * as serviceWorker from './serviceWorker';

import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={PytyperTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
serviceWorker.register();
