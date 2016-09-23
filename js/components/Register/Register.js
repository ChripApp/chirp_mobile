// @flow
import React, { Component } from 'react'
import InputNormal from '../../elements/InputNormal'
import { Actions } from 'react-native-router-flux'
import jquery from 'jquery'
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

export default class Register extends Component {
  constructor() {
    super();

    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentFirstName = this._handleCurrentFirstName.bind(this);
    this._handleCurrentLastName = this._handleCurrentLastName.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);

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

  _register() {
      if(this.props.phoneNumber.length >= 13 && this.props.firstName != undefined 
        && this.props.lastName != undefined && this.props.password != undefined){
        fetch('http://localhost:8080/user/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: this.props.phoneNumber,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            password: this.props.password,
          })}).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      }
  }

  render() {


    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          This is Register page
        </Text>
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
        <TouchableHighlight onPress={this._register}>
          <Text style={{color: '#999999', fontSize: 17.2}}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
