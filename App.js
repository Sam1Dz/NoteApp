import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DrawerNavigator from './src/navigation/Navigator';
import {Provider} from 'react-redux';

import store from './src/public/redux/store';

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    );
  }
}
