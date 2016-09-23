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

    this._handleCurrentUsername = this._handleCurrentUsername.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
  }

  _handleCurrentUsername(text) {
    this.props.updateUsername(text)
  }

  _handleCurrentPassword(text) {
    this.props.updatePassword(text)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          {this.props.username}
          {this.props.password}
        </Text>
        <InputNormal
          placeholder='Username'
          onChangeText={this._handleCurrentUsername}
          value={this.props.username}
        />
        <InputNormal
          placeholder='Password'
          onChangeText={this._handleCurrentPassword}
          value={this.props.password}
        />
        <TouchableHighlight onPress={Actions.home}>
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
