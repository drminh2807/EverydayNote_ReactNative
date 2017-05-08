import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  PropTypes,
  Alert,
  NativeModules
} from 'react-native';

export default class TopBar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.leftButtonHandle}>
          <Image
            style={styles.buttonImage}
            source={this.props.leftButtonImage}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.buttonImage}
            source={this.props.rightButtonImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// TopBar.defaultProps = {
//   leftButtonHandle: leftButtonHandle
// }
TopBar.propType = {
  leftButtonImage: React.PropTypes.ImageSourcePropType,
  rightButtonImage: React.PropTypes.object,
  text: React.PropTypes.string,
  leftButtonHandle: React.PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonImage: {
    height: 24,
    width: 24,
    margin: 16,
    resizeMode: 'contain'
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Ubuntu-Medium',
    backgroundColor: 'transparent',
  }
})
