// @flow
import * as actionTypes from '../../actionTypes'
import { getLogin } from '../../reducers/rootReducer'
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



export const login = (phoneNumber, password) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    phoneNumber: phoneNumber,
    password: password,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch('http://localhost:8080/user/signin', request)
  .then((response) => response.json())
  .then((responseJson) => {
    //Login Success
    if(responseJson.success){
      AsyncStorage.setItem('token', responseJson.token);
      Actions.main()
      dispatch({type: actionTypes.LOGIN_SUCCESS})
      dispatch({
        user: responseJson.user,
        type: actionTypes.UPDATE_USER
      })
      dispatch({
        password: '',
        type: actionTypes.UPDATE_LOGIN_PASSWORD
      })
      dispatch({
        store: responseJson.store,
        type: actionTypes.UPDATE_STORE
      })
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
    switch(error.message){
      case 'phoneNumberNotExist':
        okAlert('Phone Number Not Exist', 'Check your number buddy');
      break;
      case 'passwordNotMatch':
        okAlert('Password Not Match', 'Check your password buddy');
      break;
    }
    
    
  })

  dispatch({type: actionTypes.ON_LOGGING})
  }
}

export const autoLogin = (token) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  console.log("autolog in");

  var requestBody = {
    token: token
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
   fetch('http://localhost:8080/user/autoSignin', request)
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson.success){
        AsyncStorage.setItem('token', responseJson.token);
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        dispatch({
          user: responseJson.user ,
          type: actionTypes.UPDATE_USER
        })
        dispatch({
          password: '',
          type: actionTypes.UPDATE_LOGIN_PASSWORD
        })
        dispatch({
          store: responseJson.store ,
          type: actionTypes.UPDATE_STORE
        })

      }else{
        throw Error(responseJson.error);
      }
     }
    )
    .catch((error) => {
      switch(error.message){
        case 'autoLoginPhoneNumberError':
          okAlert('Account Not Exist', 'Check your number buddy');
        break;
      }
    });
    dispatch({type: actionTypes.ON_LOGGING})
  }
}
export const loginWithDelay = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const {onLogging} = getLogin(getState())
      if(!onLogging) {
        dispatch(login())
      }
    }, 1000)
  }
}

export const updatePhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_LOGIN_PHONENUMBER,
    phoneNumber: text,
  }
}

export const updatePassword = (text) => {
  return {
    type: actionTypes.UPDATE_LOGIN_PASSWORD,
    password: text,
  }
}
