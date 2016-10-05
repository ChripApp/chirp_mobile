// @flow
import * as actionTypes from '../../actionTypes'
import { getRegister } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
  Alert,
} from 'react-native'

function okAlert(title, content) {
  Alert.alert(
    title,
    content,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  );
}

export const register = (phoneNumber, firstName, lastName, password) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    phoneNumber: phoneNumber,
    firstName: firstName,
    lastName: lastName,
    password: password,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch('http://localhost:8080/user/signup', request)
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson.success){
        AsyncStorage.setItem('token', responseJson.token);
        Actions.main()
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        dispatch({
          user: responseJson.user , 
          type: actionTypes.UPDATE_USER
        })
        dispatch({
          store: responseJson.store , 
          type: actionTypes.UPDATE_STORE
        })
      }else{
        throw Error(responseJson.error);
      }
    })
    .catch((error) => {
      switch(error.message){
        case 'signupError':
          okAlert('Error', 'Please check the input fields and try again');
        break;
      }
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
