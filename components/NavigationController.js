import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';

import Login from './Login.js';
import Tabbar from './Tabbar.js';
import Add from './Add.js'

export default class NavigationController extends Component {
  configureScene(route, routeStack) {
    if (route.name === 'Add')
      return Navigator.SceneConfigs.VerticalUpSwipeJump
    else
      return Navigator.SceneConfigs.PushFromRight
  }
  renderScene(route, navigator) {
    switch (route.name) {
      case 'Login': return (<Login navigator={navigator} />);
        break;
      case 'Tabbar': return (<Tabbar navigator={navigator} />);
        break;
      case 'Add': return (<Add navigator={navigator} />);
        break;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Login' }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    )
  }
}
