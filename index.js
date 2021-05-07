/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import React from 'react';
import {name as appName} from './app.json';

import {AppProvider, AppContext} from './src/context';

const provider = () => (
    <AppProvider>
        <App/>
    </AppProvider>
);


AppRegistry.registerComponent(appName, () => provider);
