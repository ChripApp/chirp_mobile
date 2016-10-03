// @flow
import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'

import { Actions } from 'react-native-router-flux'

import InputNormal from '../../elements/InputNormal'
// import Style from '../../../public/assets/style/global'
// style={Style.text1}

var width = Dimensions.get('window').width

export default class Login extends Component {
  constructor() {
    super();
    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._login = this._login.bind(this);
  }

  async componentDidMount(){
  }

  _handleCurrentPhoneNumber(text) {
    this.props.updatePhoneNumber(text)
  }

  _handleCurrentPassword(text) {
    this.props.updatePassword(text)
  }

  _login(){
    this.props.login(this.props.phoneNumber, this.props.password)
  }

  render() {
    console.log("logo");
    return (
      <View style={{flex: 1}}>
      {/*<Text>
          {this.props.phoneNumber}
          {this.props.password}
        </Text> */}
        <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            source={require('../../../public/assets/img/chirplogo.png')}
            style={styles.chirpImg}
          />
          {/*<Text style={styles.chirpText}>Chirp</Text>*/}
          <TextInput
            style={[styles.transInput, {marginBottom: 15}]}
            placeholderTextColor='rgba(255,255,255,0.15)'
            placeholder='Enter Phone #'
            onChangeText={this._handleCurrentPhoneNumber}
            value={this.props.phoneNumber}
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.transInput}
            placeholderTextColor='rgba(255,255,255,0.15)'
            placeholder='Enter Password'
            onChangeText={this._handleCurrentPassword}
            value={this.props.password}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableHighlight
            onPress={this._login}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={Actions.register}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    borderColor: 'black',
    borderRadius: 0,
    height: 45,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.15)',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
  },
  chirpText: {
    color: 'black',
    fontSize: 20,
  },
  chirpImg: {
    height: 62.5,
    marginBottom: 90,
    width: 85,
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,0.1)',
    height: 45,
    padding: 15,
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
});
