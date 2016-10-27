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
  Alert
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
    var phoneNumber = text.match(/\d/g);
    if(phoneNumber != undefined){
      phoneNumber = phoneNumber.join("");
        if(phoneNumber.length >= 10)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10);
      else if(phoneNumber.length >= 7)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, phoneNumber.length);
      else if(phoneNumber.length >= 4)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, phoneNumber.length);
      else if(phoneNumber.length >= 1)
        phoneNumber = '(' + phoneNumber.substring(0, phoneNumber.length);
      else
        phoneNumber = '';
    }else{
      phoneNumber = '';
    }
    this.props.updatePhoneNumber(phoneNumber)
  }

  _handleCurrentPassword(text) {
    this.props.updatePassword(text)
  }

  _login(){
    if(this.props.phoneNumber == undefined){
      Alert.alert(
        "Sorry",
        "Please enter registered phone number",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }else if(this.props.password == undefined){
      Alert.alert(
        "Sorry",
        "Please enter password",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }

    this.props.login(this.props.phoneNumber, this.props.password)


  }

  render() {
    // <TextInput
    //   style={styles.transInput}
    //   placeholderTextColor='rgba(255,255,255,0.18)'

    return (
      <View style={{flex: 1, padding: 45}}>
      {/*<Text>
          {this.props.phoneNumber}
          {this.props.password}
        </Text> */}
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            source={require('../../../public/assets/img/chirpLogoV2.1.png')}
            style={styles.chirpImg}
          />
          <Text style={styles.chirpText}>CHIRP</Text>

        </View>

        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <TextInput
            style={styles.transInput}
            placeholderTextColor='#88898C'
            placeholder='Enter Phone #'
            maxLength={14}
            onChangeText={this._handleCurrentPhoneNumber}
            value={this.props.phoneNumber}
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.transInput}
            placeholderTextColor='#88898C'
            placeholder='Enter Password'
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this._handleCurrentPassword}
            secureTextEntry={true}
            value={this.props.password}
          />
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
    // backgroundColor: '#F4F3F1',
    // borderColor: 'rgba(255,255,255,0.2)',
    // borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#F4F3F1',
    borderColor: 'black',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    // color: '#986B6C',
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chirpText: {
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Arial',
    fontSize: 90,
    fontWeight: 'bold',
  },
  chirpImg: {
    // height: 62.5,
    // marginBottom: 20,
    // width: 85,
    height: 79,
    marginBottom: 20,
    width: 85,
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // borderWidth: 1,
    // borderRadius: 25,
    // borderColor: 'rgba(255,255,255,0.18)',

    backgroundColor: 'white',
    borderColor: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    fontWeight: '200',
    height: 45,
    padding: 15,
  },
})
