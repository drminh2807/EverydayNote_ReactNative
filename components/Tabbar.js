import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  CustomBadgeView
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Home from './Home.js';
import Calendar from './Calendar.js';
import Add from './Add.js';
import Discover from './Discover.js';
import Profile from './Profile.js';
import LinearGradient from 'react-native-linear-gradient';

export default class Tabbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      // selectedTab: 'home'
      selectedTab: 'profile'
    }
  }
  render(){
    return(
      <View style={styles.container} >
      <LinearGradient
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0,1]}
        colors={['#FFC86E','#FA508C']}
        style={styles.linearGradient}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => <Image source={require('../res/img/tabbar_home.png')} />}
            renderSelectedIcon={() => <Image source={require('../res/img/tabbar_home_selected.png')} />}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home navigator={this.props.navigator}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'calendar'}
            renderIcon={() => <Image source={require('../res/img/tabbar_calendar.png')} />}
            renderSelectedIcon={() => <Image source={require('../res/img/tabbar_calendar_selected.png')} />}
            onPress={() => this.setState({ selectedTab: 'calendar' })}>
            <Calendar />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'add'}
            renderIcon={() => <Image source={require('../res/img/tabbar_add.png')} />}
            renderSelectedIcon={() => <Image source={require('../res/img/tabbar_add.png')} />}
            onPress={() => this.props.navigator.push({name: 'Add'})}
            tapStyle={{opacity: 1}}>
            {/*<Add />*/}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'discover'}
            renderIcon={() => <Image source={require('../res/img/tabbar_discover.png')} />}
            renderSelectedIcon={() => <Image source={require('../res/img/tabbar_discover_selected.png')} />}
            onPress={() => this.setState({ selectedTab: 'discover' })}>
            <Discover />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => <Image source={require('../res/img/tabbar_profile.png')} />}
            renderSelectedIcon={() => <Image source={require('../res/img/tabbar_profile_selected.png')} />}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <Profile />
          </TabNavigator.Item>
        </TabNavigator>
        </LinearGradient>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'red'
  },
  linearGradient: {
    flex: 1,
  },
})
