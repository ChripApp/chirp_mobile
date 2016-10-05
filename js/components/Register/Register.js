// @flow
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native'

import InputNormal from '../../elements/InputNormal'

export default class Register extends Component {
  constructor() {
    super();

    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentFirstName = this._handleCurrentFirstName.bind(this);
    this._handleCurrentLastName = this._handleCurrentLastName.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._handleCurrentStoreName = this._handleCurrentStoreName.bind(this);

    this._register = this._register.bind(this);
  }

  _handleCurrentPhoneNumber(text) {
    var lastType = text.charAt(text.length - 1);
    var format = text;

    if(text.length >= 14)
      return;
    else if(lastType == '(' || lastType == ')' || lastType == '-')
      format = format.substring(0, format.length - 1);
    else if(text.length == 1)
      format = '(' + format;
    else if(text.length == 4)
      format = format + ')';
    else if(text.length == 9)
      format = format.substring(0, 8) + '-' + format.substring(8, 9);

    this.props.updatePhoneNumber(format)
  }

  _handleCurrentFirstName(text) {
    this.props.updateFirstName(text)
  }

  _handleCurrentLastName(text) {
    this.props.updateLastName(text)
  }

  _handleCurrentPassword(text) {
    this.props.updatePassword(text)
  }

  _handleCurrentStoreName(text) {
    this.props.updateStoreName(text)
  }

  _register() {
      if(this.props.phoneNumber.length >= 13 && this.props.firstName != undefined
        && this.props.lastName != undefined && this.props.password != undefined){
        this.props.register(this.props.phoneNumber, this.props.firstName, this.props.lastName, this.props.password)
      }
  }

  render() {


    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center', padding: 45}}>

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='PHONE #'
          onChangeText={this._handleCurrentPhoneNumber}
          value={this.props.phoneNumber}
          keyboardType='phone-pad'
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='FIRST NAME'
          onChangeText={this._handleCurrentFirstName}
          value={this.props.firstName}
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='LAST NAME'
          onChangeText={this._handleCurrentLastName}
          value={this.props.lastName}
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='PASSWORD'
          onChangeText={this._handleCurrentPassword}
          value={this.props.password}
        />

        {/*<InputNormal
            placeholder='Store Name'
            onChangeText={this._handleCurrentStoreName}
            value={this.props.storeName}
          />*/}

        <View style={{height: 45, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TouchableHighlight
              onPress={this._register}
              style={styles.buttonContainer}
              underlayColor='transparent'
            >
              <Text style={styles.buttonText}>
                SUBMIT
              </Text>
            </TouchableHighlight>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    borderColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    color: '#986B6C',
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'rgba(255,255,255,0.18)',
    height: 45,
    padding: 15,
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
