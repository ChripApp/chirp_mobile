// @flow
import * as actionTypes from '../../actionTypes'
import { getLogin } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
} from 'react-native'

// Action creators
export const login = (phoneNumber, password) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  return dispatch => {
  fetch('http://localhost:8080/user/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  body: JSON.stringify({
    phoneNumber: phoneNumber,
    password: password,
   })}).then((response) => response.json())
  .then((responseJson) => {
    //Login Success
    console.log(responseJson);
    if(responseJson.success){
      AsyncStorage.setItem('token', responseJson.token);
      Actions.main()
      dispatch({type: actionTypes.LOGIN_SUCCESS})
      dispatch({user: responseJson.user , type: actionTypes.UPDATE_USER})
      dispatch({store: responseJson.store , type: actionTypes.UPDATE_STORE})
    }

   })
  .catch((error) => {
    console.log("here");
  });

  dispatch({type: actionTypes.ON_LOGGING})
  }
}

export const autoLogin = (token) => {
  return dispatch => {
    fetch('http://localhost:8080/user/autoSignin',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: token})
      }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      //Login Success
      if(responseJson.success){
        console.log(responseJson.token);
        AsyncStorage.setItem('token', responseJson.token);
        Actions.home()
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        dispatch({user: responseJson.user , type: actionTypes.UPDATE_USER})
        dispatch({store: responseJson.store , type: actionTypes.UPDATE_STORE})
      }
     }
    )
    .catch((error) => {
      console.error(error);
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
