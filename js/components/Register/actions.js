// @flow
import * as actionTypes from '../../actionTypes'
import { getRegister } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
} from 'react-native'
// Action creators
export const register = (phoneNumber, firstName, lastName, password, storeName) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  return dispatch => {
  fetch('http://localhost:8080/user/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      password: password,
      storeName: storeName,
    })}).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        AsyncStorage.setItem('token', responseJson.token);
        Actions.main()
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        dispatch({user: responseJson.user , type: actionTypes.UPDATE_USER})
        dispatch({store: responseJson.store , type: actionTypes.UPDATE_STORE})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

export const updatePhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_PHONENUMBER,
    phoneNumber: text,
  }
}

export const updateFirstName = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_FIRSTNAME,
    firstName: text,
  }
}

export const updateLastName = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_LASTNAME,
    lastName: text,
  }
}

export const updatePassword = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_PASSWORD,
    password: text,
  }
}

export const updateStoreName = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_STORENAME,
    storeName: text,
  }
}
