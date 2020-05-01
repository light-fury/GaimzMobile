/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Containers/App';
import {name as appName} from './app.json';
import {typography} from './src/Components/Typography';

typography();

// console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
