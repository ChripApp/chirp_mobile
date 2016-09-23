// @flow
import React, { Component } from 'react'
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import InputNormal from '../../elements/InputNormal'
// import Style from '../../../public/assets/style/global'
// style={Style.text1}

export default class Login extends Component {
  constructor() {
    super();
    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._login = this._login.bind(this);
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
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          {this.props.phoneNumber}
          {this.props.password}
        </Text>
        <InputNormal
          placeholder='Phone Number'
          onChangeText={this._handleCurrentPhoneNumber}
          value={this.props.phoneNumber}
        />
        <InputNormal
          placeholder='Password'
          onChangeText={this._handleCurrentPassword}
          value={this.props.password}
        />
        <TouchableHighlight onPress={this._login}>
          <Text style={{color: '#999999', fontSize: 17.2}}>
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={Actions.register}>
          <Text style={{color: '#999999', fontSize: 17.2}}>
            Register
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
