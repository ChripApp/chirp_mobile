import * as actionTypes from '../../actionTypes'
import { getLogin, getMode } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
  Alert,
} from 'react-native'

export const mode = () => {
}

function okAlert(title, content) {
  Alert.alert(
    title,
    content,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  );
}

export const verify = (phoneNumber , password) => {
  
    var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    phoneNumber: phoneNumber,
    password: password
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/user/verify', request)
  .then((response) => response.json())
  .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
         dispatch({
          verified: true,
          type: actionTypes.UPDATE_VERIFICATION
         })
         dispatch({
            password: '',
            type: actionTypes.UPDATE_PROFILE_PASSWORD
          })
      }else{
         dispatch({
          verified: false,
          type: actionTypes.UPDATE_VERIFICATION
         })
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
    });
  }
}



export const updateProfilePassword = (text) => {
  return {
    type: actionTypes.UPDATE_VERIFICATION_PASSWORD,
    verificationPassword: text,
  }
}

export const updateVerificationRequired = (text) => {
  return {
    type: actionTypes.UPDATE_VERIFICATIONREQUIRED,
    verificationRequired: text,
  }
}

export const updateVerificationStatus = (text) => {
  return {
    type: actionTypes.UPDATE_VERIFICATION,
    verified: text,
  }
}

