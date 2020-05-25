import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeProvider} from '@material-ui/core/styles';

import PytyperTheme from './theme';

import * as serviceWorker from './serviceWorker';

import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={PytyperTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
serviceWorker.register();
