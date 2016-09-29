// @flow
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
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
        this.props.register(this.props.phoneNumber, this.props.firstName, this.props.lastName, this.props.password, this.props.storeName)
      }
  }

  render() {


    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput placeholder='hi there'/>
        <InputNormal
          placeholder='Phone Number'
          type='number'
          onChangeText={this._handleCurrentPhoneNumber}
          value={this.props.phoneNumber}
        />
        <InputNormal
            placeholder='First Name'
            onChangeText={this._handleCurrentFirstName}
            value={this.props.firstName}
          />
        <InputNormal
            placeholder='Last Name'
            onChangeText={this._handleCurrentLastName}
            value={this.props.lastName}
          />
        <InputNormal
            placeholder='Password'
            onChangeText={this._handleCurrentPassword}
            value={this.props.password}
          />
        <InputNormal
            placeholder='Store Name'
            onChangeText={this._handleCurrentStoreName}
            value={this.props.storeName}
          />

        <TouchableHighlight onPress={this._register}>
          <Text style={{color: '#999999', fontSize: 17.2}}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
