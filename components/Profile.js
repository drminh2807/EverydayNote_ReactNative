import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  NativeModules,
} from 'react-native';
import Triangle from 'react-native-triangle';
import TopBar from './TopBar.js'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceAvatar: require('../res/img/avatar-placeholder.png'),
      currentUser: null
    }
  }
  componentDidMount(){
    NativeModules.FIRUserManager.currentUser((user) =>{
      this.setState({
        currentUser: user,
        sourceAvatar: {uri:user.photoURL}
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBar
          leftButtonImage={require('../res/img/top_left_menu.png')}
          rightButtonImage={require('../res/img/ic_settings.png')}
          text='Profile'
        />
        <View style={styles.topContainer}>
          <View style={styles.triangleAndAvatarContainer}>
            <View style={styles.triangleView}>
              <Triangle
                width={Dimensions.get('window').width}
                height={80}
                color={'white'}
                direction={'down-right'}
              >
              </Triangle>
              <View style={{ backgroundColor: 'white', height: 10 }} />
            </View>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatarImage}
                source={this.state.sourceAvatar}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.userFullnameText}>
            {this.state.currentUser?this.state.currentUser.displayName:'User Name'}
          </Text>
          <Text style={styles.userStatusText}>
            There is only one happiness in this life,{'\n'}to love and be loved.
          </Text>
          </View>
          <Text style={styles.infoContainer}>
          </Text>
        </View>
        <View style={styles.bottomContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // flexDirection: 'flex-end'
  },
  triangleAndAvatarContainer: {
    width: Dimensions.get('window').width
  },
  avatarContainer: {
    alignSelf: 'center',
    borderRadius: 56,
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.3)',

  },
  triangleView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  avatarImage: {
    // flex: 1,
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  userFullnameText: {
    color: '#666666',
    fontFamily: 'Ubuntu-Medium',
    fontSize: 24,
    
    flex: 1
  },
  userStatusText: {
    color: '#BCBCBC',
    fontFamily: 'Ubuntu-Italic',
    fontSize: 14,
    textAlign: 'center',
    flex: 1
  },
  infoContainer: {
    height: 50,
    width: Dimensions.get('window').width,
    backgroundColor: 'white'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
})
