import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const theme = createMuiTheme({
    palette: {
        primary: {
        main: '#000000',
        contrastText: '#fff'
        },
    },
    overrides: {
        // Style sheet name ⚛️
        MuiFab: {
          // Name of the rule
          sizeSmall: {
            // Some CSS
            height: '1.3rem',
            minHeight: '0px',

            width: '1.3rem',
            marginRight: '0.2rem',
            marginLeft: '0.2rem',
            fontSize: '1.0rem'
          },
        },
      },
});

ReactDOM.render(
    <Router>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
