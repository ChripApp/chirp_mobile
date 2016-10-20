// @flow
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Alert
} from 'react-native'

import InputNormal from '../../elements/InputNormal'

export default class Register extends Component {
  constructor() {
    super();

    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentFirstName = this._handleCurrentFirstName.bind(this);
    this._handleCurrentLastName = this._handleCurrentLastName.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._handleCurrentConfirmPassword = this._handleCurrentConfirmPassword.bind(this);

    this._register = this._register.bind(this);
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

  _handleCurrentFirstName(text) {
    this.props.updateFirstName(text)
  }

  _handleCurrentLastName(text) {
    this.props.updateLastName(text)
  }

  _handleCurrentPassword(text) {
    this.props.updatePassword(text)
  }
  _handleCurrentConfirmPassword(text) {
    this.props.updateConfirmPassword(text)
    console.log(this.props);
  }


  _register() {
      if(this.props.phoneNumber == undefined || this.props.phoneNumber.length < 14){
        Alert.alert(
          "Sorry",
          "Please enter registered phone number",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }else if(this.props.firstName == undefined || this.props.lastName == undefined){
        Alert.alert(
          "Sorry",
          "Please enter your name",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }else if(this.props.password == undefined){
        Alert.alert(
          "Sorry",
          "Please enter the password",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }else if(this.props.password != this.props.passwordConfirm){
        Alert.alert(
          "Sorry",
          "Please check confirm password",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }
      
      this.props.register(this.props.phoneNumber, this.props.firstName, this.props.lastName, this.props.password)
  }

  render() {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center', padding: 45}}>

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='PHONE #'
          maxLength={14}
          onChangeText={this._handleCurrentPhoneNumber}
          value={this.props.phoneNumber}
          keyboardType='phone-pad'
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='FIRST NAME'
          autoCorrect={false}
          onChangeText={this._handleCurrentFirstName}
          value={this.props.firstName}
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='LAST NAME'
          autoCorrect={false}
          onChangeText={this._handleCurrentLastName}
          value={this.props.lastName}
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='PASSWORD'
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={this._handleCurrentPassword}
          value={this.props.password}
        />

        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='CONFIRM PASSWORD'
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={this._handleCurrentConfirmPassword}
          value={this.props.passwordConfirm}
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
