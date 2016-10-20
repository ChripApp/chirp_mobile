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
    return (
      <View style={{flex: 1, padding: 45}}>
      {/*<Text>
          {this.props.phoneNumber}
          {this.props.password}
        </Text> */}
        <View style={{flex: 1.5, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            source={require('../../../public/assets/img/chirplogo.png')}
            style={styles.chirpImg}
          />
          {/* rgba(255,255,255,0.18) <Text style={styles.chirpText}>Chirp</Text>*/}
          <TextInput
            style={styles.transInput}
            placeholderTextColor='#88898C'
            placeholder='Enter Phone #'
            onChangeText={this._handleCurrentPhoneNumber}
            value={this.props.phoneNumber}
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.transInput}
            placeholderTextColor='#88898C'
            placeholder='Enter Password'
            onChangeText={this._handleCurrentPassword}
            value={this.props.password}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <View style={{height: 45, flexDirection: 'row',}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._login}
                style={styles.loginButtonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Log In
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={{height: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={Actions.register}
                style={styles.registerButtonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Register
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  registerButtonContainer: {
    // backgroundColor: 'rgba(255,255,255,0.18)',
    // backgroundColor: '#ADDCE9',
// backgroundColor: '#F4F3F1',
backgroundColor: 'rgba(255,255,255,0.35)',

    // backgroundColor: '#FEC89A',
    borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    borderColor: 'black',
    // borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  loginButtonContainer: {
    // backgroundColor: 'rgba(255,255,255,0.18)',
    // backgroundColor: 'rgba(255,255,255,0.35)',
    backgroundColor: '#F4F3F1',

    // backgroundColor: '#F4F3F1',
    borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    borderColor: 'black',
    // borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    // color: '#986B6C',
    color: 'rgba(0,0,0,0.3)',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
  },
  chirpText: {
    color: 'black',
    fontSize: 20,
  },
  chirpImg: {
    height: 62.5,
    marginBottom: 35,
    width: 85,
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // borderWidth: 1,
    // borderRadius: 25,
    // borderColor: 'rgba(255,255,255,0.18)',
    borderColor: 'black',
    height: 45,
    padding: 15,
    fontFamily: 'Helvetica Neue',
    fontSize: 13,

    fontWeight: '200',
    backgroundColor: 'white',
  },
})
