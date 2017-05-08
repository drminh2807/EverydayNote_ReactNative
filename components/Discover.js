import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import TopBar from './TopBar.js'

export default class Discover extends Component{
  render(){
    return(
      <View style={styles.container}>
        <TopBar
          leftButtonImage={require('../res/img/top_left_menu.png')}
          rightButtonImage={require('../res/img/btn_noti.png')}
          text='Discover'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
})
