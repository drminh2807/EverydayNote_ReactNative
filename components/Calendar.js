import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ListView,
  Dimensions
} from 'react-native';

import TopBar from './TopBar.js'

import Search from 'react-native-search-box';

import GridView from 'react-native-grid-view'
import EasyListView from 'react-native-easy-listview-gridview'

import {GetTimeStringFromDate} from '../objects/DateFunc.js'
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const shortMonths = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

var now = new Date()
daysInMonth = (month,year) => {
    return new Date(year, month+1, 0).getDate();
}
const weekDayArr = ['S','M','T','W','T','F','S']
getCalendarDayArr = (date) => {
  var now = date
  var numDaysCurrentMonth = daysInMonth(now.getMonth(),now.getFullYear())
  var dateArr = Array(numDaysCurrentMonth).fill(null)
    .map((item, index) =>
    new Date(now.getFullYear(),now.getMonth(),index+1))
  var data = weekDayArr.slice()
  var firstDay = new Date(now.getFullYear(),now.getMonth(),1)
  var weekdayOfFirstDay = firstDay.getDay()
  var numDaysOfPreMonth = daysInMonth(now.getMonth()-1,now.getFullYear())
  var preMonthDaysArr = Array(weekdayOfFirstDay).fill(null)
        .map((item, index) =>
        new Date(now.getFullYear(),now.getMonth()-1,index+ numDaysOfPreMonth - weekdayOfFirstDay +1))
  var weekdayOfLastDay = new Date(now.getFullYear(),now.getMonth(),numDaysCurrentMonth).getDay()
  var nextMonthDaysArr = Array(6-weekdayOfLastDay).fill(null)
        .map((item, index) =>
        new Date(now.getFullYear(),now.getMonth()+1,index+1))
  data = data.concat(preMonthDaysArr)
  data = data.concat(dateArr)
  data = data.concat(nextMonthDaysArr)
  return data
}

var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})

const noteData = [{date: new Date(2017)},'row 2']

export default class Calendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
      dataSource: getCalendarDayArr(new Date()),
      noteDS: ds.cloneWithRows(noteData)
    }
  }
  render(){
    return(
    <View style={styles.container}>
        <TopBar
          leftButtonImage={require('../res/img/top_left_menu.png')}
          rightButtonImage={require('../res/img/ic_view_day.png')}
          text='Calendar'
        />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Search style={styles.search}
            ref="search_box"
            placeholder='Search through your posts'
            backgroundColor='transparent'
            searchIconCollapsedMargin={90}
            placeholderCollapsedMargin={80}
            placeholderTextColor='#C8C8C8'
          />
          <View style={styles.calendarContainer}>
            <View style={styles.headerCalendarContainer}>
              <TouchableOpacity onPress={this.changeMonth.bind(this,-1)}>
                <Image source={require('../res/img/calendar_previous.png')} />
              </TouchableOpacity>
              <Text style={styles.headerCalendarText}>
                {months[ this.state.selectedDay.getMonth() ]} {this.state.selectedDay.getFullYear()}
              </Text>
              <TouchableOpacity onPress={this.changeMonth.bind(this,1)}>
                <Image source={require('../res/img/calendar_next.png')} />
              </TouchableOpacity>
            </View>
            <GridView
              items={this.state.dataSource}
              itemsPerRow={7}
              renderItem={this.renderCalendarItem.bind(this)}
              style={styles.gridView}
            />
              {/* <EasyListView
                ref={component => this.gridview = component}
                column={7}
                renderItem={this.renderItem.bind(this)}
                fixedData={this.state.dataSource.cloneWithRows(getCalendarDayArr(this.state.selectedDay))}
                isDataFixed={true}
                contentContainerStyle={styles.gridView}
                scrollEnabled={false}
                containerHeight={280}
              /> */}
          </View>
          <View style={styles.bottomContainer}>
            <ListView
              dataSource={this.state.noteDS}
              renderRow={this.renderNote.bind(this)}
              style={styles.noteList} />
          </View>
        </ScrollView>
      </View>
    );
  }
  renderCalendarItem = (item, index) => {
    var rowData = item
    let cell = null
    if (rowData instanceof Date) {
      var underLineStyle = styles.rowUnderLineCustom
      var textStyle
      if (rowData.getTime() > new Date().getTime()) {
        if (rowData.getMonth() !== this.state.selectedDay.getMonth()) {
          textStyle = styles.rowAnotherMonthText
        } else {
          textStyle = styles.rowCurrentMonthText
        }
        underLineStyle = {}
      }else {
        if (rowData.getMonth() !== this.state.selectedDay.getMonth()) {
          textStyle = styles.rowAnotherMonthText
          underLineStyle = [styles.rowUnderLineCustom,{opacity: 0.3}]
        } else {
          textStyle = styles.rowCurrentMonthText
        }
      }
      var text = <Text style={textStyle}>{rowData.getDate()}</Text>
      if (rowData.getDate() === this.state.selectedDay.getDate() &&
          rowData.getMonth() === this.state.selectedDay.getMonth() &&
          rowData.getFullYear() === this.state.selectedDay.getFullYear() ) {
        cell = <Image
          source = {require('../res/img/calendar_select_oval.png')}
          style={styles.rowImage}>
            <Text style={[textStyle,{color: 'white'}]}>{rowData.getDate()}</Text>
          </Image>
      }else{
        var underLine = <View style={underLineStyle}></View>
        cell = <View style={{alignItems:'center'}}>{text}{underLine}</View>
      }
      return (
        <TouchableOpacity
          onPress={this.selectDayHandle.bind(this, rowData)}
          key={index}
          style={styles.calendarCell}>
          {cell}
        </TouchableOpacity>
      );
    }else {
      return <View
        key={index}
        style={styles.calendarCell}>
        <Text style={styles.rowWeekDayText}>{rowData}</Text>
      </View>
    }
  }
  renderNote(item){
    var dt = this.state.selectedDay
    return(
      <View style={styles.noteRowContainer}>
        <View style={styles.noteRowDateContainer}>
          <Text style={styles.noteRowDayText}>
            {dt.getDate()}
          </Text>
          <Text style={styles.noteRowMonthText}>
            {shortMonths[dt.getMonth()]}
          </Text>
        </View>
        <View style={styles.noteRowDescriptionContainer}>
          <Text
            style={styles.noteRowContentText}>
            A slow but sure start.A slow but sure start.A slow but sure start.A slow but sure start.A slow but sure start.
          </Text>
          <Text style={styles.noteRowTimeText}>
            {weekdays[dt.getDay()]}, {GetTimeStringFromDate(dt)}
          </Text>
        </View>
      </View>
    )
  }
  selectDayHandle = (rowData) =>{
    if (rowData.getMonth() > this.state.selectedDay.getMonth()) {
      this.changeMonth(1)
    }else if (rowData.getMonth() < this.state.selectedDay.getMonth()) {
      this.changeMonth(-1)
    }
    this.setState({
      selectedDay: rowData
    })
  }
  changeMonth = (numChange) => {
    var date = this.state.selectedDay
    date.setMonth(date.getMonth()+numChange)
    this.setState({
      selectedDay: date,
      dataSource: getCalendarDayArr(date),
    })
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'transparent'
  },
  search: {
  },
  calendarContainer: {
    backgroundColor: 'white'
  },
  headerCalendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    marginTop: 30,
  },
  headerCalendarText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#809EFD',
  },
  gridView: {
    padding: 25,
  },
  calendarCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32
  },
  rowWeekDayText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: 'rgba(52,72,94,0.54)'
  },
  rowCurrentMonthText: {
    fontSize: 14,
    fontFamily: 'Ubuntu',
    color: '#666666',
    backgroundColor: 'transparent'
  },
  rowAnotherMonthText: {
    fontSize: 14,
    fontFamily: 'Ubuntu',
    color: '#E1E4E7',
    backgroundColor: 'transparent'
  },
  rowUnderLineCustom: {
    borderBottomWidth: 0.5,
    width: 10,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  rowImage: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  bottomContainer: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    // height: Dimensions.get('window').height
  },
  noteRowContainer:{
    flexDirection: 'row',
    padding: 12,
    margin: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center'
  },
  noteRowDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  noteRowDayText: {
    fontSize: 28,
    fontFamily: 'Ubuntu-Bold',
    color: '#82A0FA',
    opacity: 0.5
  },
  noteRowMonthText: {
    fontSize: 12,
    fontFamily: 'Ubuntu-Bold',
    color: '#82A0FA',
    opacity: 0.5
  },
  noteRowDescriptionContainer: {
    flex: 1
  },
  noteRowContentText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#666666',
    textAlign: 'auto'
  },
  noteRowTimeText: {
    fontSize: 12,
    fontFamily: 'Ubuntu',
    color: '#999999'
  }
})
