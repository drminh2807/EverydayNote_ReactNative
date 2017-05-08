

import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

export default class Intro extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={require('../res/img/img_flat_icon.png')}
          />
          <Text style = {[styles.textUnderIcon, styles.text]}>
            EVERYDAY
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style = {[styles.bigBottomText, styles.text]}>
            {this.props.bigText}
          </Text>
          <Text style = {[styles.smallBottomText, styles.text]}>
            {this.props.smallText}
          </Text>
        </View>
      </View>
    );
  }
}

Intro.propType = {
  bigText:React.PropTypes.string,
  smallText: React.PropTypes.string
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    width: width
  },
  textUnderIcon: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14
  },
  image: {
    width: 72,
    height: 48,
    marginBottom: 14
  },
  topContainer:{
    flex: 4,
    justifyContent: 'center'
  },
  bottomContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigBottomText: {
    fontSize: 27,
    fontFamily: 'Ubuntu-Medium',
    fontSize: 28,
  },
  smallBottomText: {
    fontSize: 14,
    fontFamily: 'Ubuntu',
    fontSize: 14,
    marginTop: 8
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
  }
})
