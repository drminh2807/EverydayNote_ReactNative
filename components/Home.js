import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  Alert,
  NativeModules
} from 'react-native';

import TopBar from './TopBar.js'

var date = new Date();
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const data =
  [{date:'03', weekDay:'TUE', detail:'A slow but sure start.'},
  {date:'02', weekDay:'MON', detail:'First working day of the new year!'},
  {date:'01', weekDay:'SUN', detail:'What a way to start the year :)'}]
export default class Home extends Component{
  constructor() {
    super();
    this.state = {
      dataSource: ds,
    };
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TopBar
            leftButtonImage={require('../res/img/top_left_menu.png')}
            rightButtonImage={require('../res/img/btn_noti.png')}
            leftButtonHandle={this.leftButtonHandle}
            text='Home'
          />
          <TouchableOpacity style={styles.calendarContainer}>
            <View style={styles.textCalendarContainer}>
              <Text style={styles.dayText}>
                {date.getDate()}
              </Text>
              <View style={styles.rightTextCalendarContainer}>
                <Text style={styles.rightCalendarText}>
                  {days[ date.getDay() ]}
                </Text>
                <Text style={styles.rightCalendarText}>
                  {months[ date.getMonth() ]}, {date.getFullYear()}
                </Text>
              </View>
            </View>
            <Image
              source={require('../res/img/ic_chevron_right.png')}
              style={styles.chevronRightImage}
            />
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
        <View style={styles.midAndListContainer}>
          <View style={styles.midTextContainer}>
            <Text style={styles.midLargeText}>
              Add a little
            </Text>
            <Text style={[styles.midLargeText, {color:'#FFC864'}]}>confetti</Text>
            <Text style={styles.midLargeText}>
                to each day.
            </Text>
            <Text style={styles.midSmallText}>
              Need more inspiration? Swipe aside!
            </Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.headerList}>
              <Text style={styles.recentText}>
                Recent Posts
              </Text>
              <Text style={styles.recentDate}>
                JAN 2017
              </Text>
            </View>
            <ListView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </View>
        </View>
      </View>
    );
  }
  renderRow = (rowData) => {
    return(
      <View style={styles.row}>
        <View style={styles.rowDateContainer}>
          <Text style={styles.rowDateText}>
            {rowData.date}
          </Text>
          <Text style={styles.rowWeekDayText}>
            {rowData.weekDay}
          </Text>
        </View>
        <Text style={styles.rowDetailText}>{rowData.detail}</Text>
      </View>
    )
  }
  componentDidMount(){
    this.setState({
      dataSource: ds.cloneWithRows(data)
    })
  }
  popHandle = () => {
    this.props.navigator.pop({name: 'Login'})
  }
  leftButtonHandle = () => {
    Alert.alert(
      'LogOut ?',
      'Are you sure to log out',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Log out', onPress: () => {
          this.popHandle()
          NativeModules.FIRUserManager.logOut()
        }},
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  calendarContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textCalendarContainer:{
    flexDirection: 'row'
  },
  dayText: {
    fontSize: 40,
    fontFamily: 'Ubuntu-Medium',
    color: 'white',
  },
  rightTextCalendarContainer: {
    justifyContent:'space-around',
    marginLeft: 10
  },
  rightCalendarText: {
    fontSize: 15,
    fontFamily: 'Ubuntu',
    color: 'white',
  },
  chevronRightImage: {

  },
  line: {
    height:1,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  midAndListContainer: {

  },
  midTextContainer: {
    marginBottom: 33,
    marginLeft: 16,
  },
  midLargeText: {
    fontSize: 36,
    fontFamily: 'Ubuntu-Bold',
    color: 'white',
  },
  midSmallText: {
    fontSize: 12,
    fontFamily: 'Ubuntu',
    color: 'rgba(255,255,255,0.5)',
  },
  listContainer: {
    backgroundColor: '#F5F5F5'
  },
  headerList: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    flexDirection: 'row',
    marginLeft: 16,
    paddingRight: 20,
    marginBottom: 38,
  },
  recentText: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    color: '#666666',
  },
  recentDate: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    color: '#999999',
  },
  row: {
    width: 120,
    height: 80,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 10
  },
  rowDateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rowDateText: {
    fontSize: 28,
    fontFamily: 'Ubuntu-Bold',
    color: 'rgba(130,160,250,0.5)',
  },
  rowWeekDayText: {
    fontSize: 10,
    fontFamily: 'Ubuntu',
    color: '#C8C8C8',
  },
  rowDetailText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Ubuntu',
    color: '#666666',
  }
})
