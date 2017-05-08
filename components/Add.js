import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  NativeModules
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';
import { GetNameMonths, GetTimeStringFromDate } from '../objects/DateFunc.js'



getCurrentDateString = () => {
  var dt = new Date()
  return 'Entry for ' + GetNameMonths(dt) + ' ' + dt.getDate() + ', ' + dt.getFullYear() + ' | ' + GetTimeStringFromDate(dt) + ''
}
export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleNote: '',
      detailNote: '',
      canSave: false
    }
  }
  render() {
    var saveBtn
    if (this.state.canSave) {
      saveBtn = <TouchableOpacity
        onPress={this.onSavePress}
        style={styles.topButtonContainer}>
        <Text style={styles.doneButtonText}>
          SAVE
          </Text>
      </TouchableOpacity>
    } else {
      saveBtn = <View
        style={styles.topButtonContainer}>
        <Text style={styles.saveButtonText}>
          SAVE
          </Text>
      </View>
    }
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
        locations={[0, 1]}
        colors={['#FFC86E', '#FA508C']}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              {saveBtn}
              <Text style={styles.headerText}>New Post</Text>
              <TouchableOpacity
                onPress={this.onDonePress}
                style={styles.topButtonContainer}>
                <Text style={styles.doneButtonText}>
                  DONE
            </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>
                {getCurrentDateString()}
              </Text>
            </View>
            <KeyboardAvoidingView
              behavior='height'
              style={styles.noteInputContainder}>
              <TextInput
                style={styles.titleNoteTextInput}
                placeholder="Add a title"
                autoFocus={true}
                autoCorrect={false}
                placeholderTextColor='#C8C8C8'
                onChangeText={this.onChangeTitleNote.bind(this)}
              />
              <TextInput
                style={styles.detailNoteTextInput}
                placeholder="Start writing..."
                multiline={true}
                autoCorrect={false}
                placeholderTextColor='#C8C8C8'
                onChangeText={this.onChangeDetailNote.bind(this)}
              />
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
  onChangeTitleNote = (titleNote) => {
    this.setState({
      titleNote: titleNote,
      canSave: titleNote.length && this.state.detailNote.length
    })
  }
  onChangeDetailNote = (detailNote) => {
    this.setState({
      detailNote: detailNote,
      canSave: this.state.titleNote.length && detailNote.length
    })
  }
  onDonePress = () => {
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topButtonContainer: {
    padding: 16
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    color: '#999999'
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'Ubuntu',
    color: '#030303'
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    color: '#82A0FA'
  },
  line: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  dateTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40
  },
  dateText: {
    fontSize: 11,
    fontFamily: 'Ubuntu',
    color: '#D1D1D1'
  },
  noteInputContainder: {
    paddingRight: 16,
    paddingLeft: 16,
    flex: 1
  },
  titleNoteTextInput: {
    fontSize: 24,
    fontFamily: 'Ubuntu',
    color: '#030303',
    height: 30,
  },
  detailNoteTextInput: {
    fontSize: 14,
    fontFamily: 'Ubuntu',
    color: '#030303',
    flex: 1
  }
})
