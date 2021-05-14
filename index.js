/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import React from 'react';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers';


//
import {AppProvider, AppContext} from './src/context';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = createStore(
    reducers,
    composeEnhancers(applyMiddleware(promiseMiddleware))
);

const reduxApp = () => (
    <Provider store={createStoreWithMiddleware}>
        <App/>
    </Provider>
)


const provider = () => (
    <AppProvider>
        <App/>
    </AppProvider>
);

//AppRegistry.registerComponent('main', () => reduxApp);

AppRegistry.registerComponent(appName, () => reduxApp);
