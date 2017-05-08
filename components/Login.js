import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  NativeModules,
  Alert,
  ActivityIndicator
} from "react-native";
import Firestack from 'react-native-firestack'
import LinearGradient from 'react-native-linear-gradient';
import Intro from './Intro.js';
import PageControl from 'react-native-page-control';
var { height, width } = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
const firestack = new Firestack();
const firebase = require('firebase')
var config = {
  apiKey: "AIzaSyDaArruVlInjzYq-f9PBIrVLpodz8D-0iY",
  authDomain: "everyday-3c726.firebaseapp.com",
  databaseURL: "https://everyday-3c726.firebaseio.com/",
  storageBucket: "gs://everyday-3c726.appspot.com/",
};
firebase.initializeApp(config);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
      loadingVisible: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.loadingVisible} textStyle={{ color: '#FFF' }} />
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
          locations={[0, 1]}
          colors={['#FFC86E', '#FA508C']}
          style={styles.linearGradient}>
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={this.handleScroll}>
            <Intro bigText='Write Everyday' smallText='Jott down your everyday.' />
            <Intro bigText='Get Inspired' smallText='Fresh inspiration to get you going.' />
            <Intro bigText='Discover Journeys' smallText='Follow people and be part of their life journey.' />
          </ScrollView>
          <PageControl
            style={styles.pageControl}
            numberOfPages={3}
            currentPage={this.state.pageNum}
            hidesForSinglePage={true}
            pageIndicatorTintColor='#FFFFFF88'
            currentPageIndicatorTintColor='white'
            indicatorStyle={{ borderRadius: 5 }}
            currentIndicatorStyle={{ borderRadius: 5 }}
            indicatorSize={{ width: 8, height: 8 }}
            onPageIndicatorPress={this.onItemTap}
          />
        </LinearGradient>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity onPress={this.facebookLogin}>
            <View style={styles.facebookButtonContainer}>
              <Image
                style={styles.buttonImage}
                resizeMode={'center'}
                source={require('../res/img/btn_login_facebook.png')}
              />
              <Text style={styles.facebookButtonText}>
                Login with Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.googleLogin}>
            <View style={styles.googleButtonContainer}>
              <Image
                style={styles.buttonImage}
                resizeMode={'center'}
                source={require('../res/img/btn_login_google.png')}
              />
              <Text style={styles.googleButtonText}>
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.changeModeButtonContainer}>
            <TouchableOpacity style={styles.changeModeButton}>
              <Text style={styles.changeModeText}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity style={styles.changeModeButton}>
              <Text style={[styles.changeModeText, { color: '#FA508C' }]}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.auth()
  }
  facebookLogin = () => {
    this.setState({ loadingVisible: true })
    NativeModules.FIRUserManager.facebookLogin((error) => {
      this.setState({ loadingVisible: false })
      // this.auth()
      // if (error) {
      //   Alert.alert(
      //     'Error',
      //     error,
      //     [
      //       { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      //     ],
      //     { cancelable: false }
      //   )
      // } else {
      //   this.pushTabbar()
      // }
    })
  }
  googleLogin = () => {
    // this.setState({loadingVisible: true})
    // NativeModules.FIRUserManager.googleLogin((error) =>{
    //   this.setState({loadingVisible: false})
    //   if(error)
    //     Alert.alert('ERROR',error)
    //   else
    //     this.pushTabbar()
    // })
  }
  handleScroll = (event) => {
    this.setState({
      pageNum: parseInt(event.nativeEvent.contentOffset.x / width)
    });
  }
  pushTabbar = () => {
    this.props.navigator.push({ name: 'Tabbar' });
  }
  auth = () => {
    var that = this
    firestack.auth.listenForAuth(function (evt) {
      if (!evt.authenticated) {
        console.log(evt.error)
      } else {
        console.log('User details', evt.user);
        fetch('http://samples.openweathermap.org/data/2.5/weather?q=Hanoi')
          .then((response) =>{
            // return response.json()
            this.pushTabbar();
          }).catch((e)=>{
            this.pushTabbar();
          })
        // fetch("localhost:5000", { method: "GET" })
        //   .then((response) => response.json())
        //   .then((responseData) => {
        //     this.pushTabbar();
        //     console.log(responseData);
        //   })
        //   .done();
        // fetch('localhost:5000/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        //   body: JSON.stringify({
        //     email: evt.user.email,
        //     refreshToken: evt.user.refreshToken,
        //   })
        // }).then((response) => response.json())
        //   .then((responseJson) => {
        //     return responseJson.movies;
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
        // that.pushTabbar()
      }
    })
      .then(() => console.log('Listening for authentication changes'))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 5,
  },
  scrollView: {
  },
  pageControl: {
    margin: 32
  },
  bottomButtonContainer: {
    flex: 2,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around'
  },
  facebookButtonContainer: {
    backgroundColor: '#3B5999',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonImage: {
    height: 20,
    width: 20,
    marginRight: 21
  },
  facebookButtonText: {
    color: 'white',
    fontFamily: 'Ubuntu',
    fontSize: 14
  },
  googleButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E6E6E6'
  },
  googleButtonText: {
    color: '#666666',
    fontFamily: 'Ubuntu',
    fontSize: 14
  },
  changeModeButtonContainer: {
    height: 48,
    flexDirection: 'row'
  },
  changeModeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    backgroundColor: '#F1F1F1',
    width: 1
  },
  changeModeText: {
    color: '#666666',
    fontFamily: 'Ubuntu',
    fontSize: 14
  }
});
