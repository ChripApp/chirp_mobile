import * as actionTypes from '../../actionTypes'
import { getLogin, getProfile } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
} from 'react-native'

export const profile = () => {
  console.log('Profile')
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
  fetch('http://localhost:8080/user/verify', request)
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson.success){
         dispatch({
          verified: true,
          type: actionTypes.UPDATE_PROFILE_VERIFICATION
         })
      }else{
        dispatch({
          verified: false,
          type: actionTypes.UPDATE_PROFILE_VERIFICATION
         })
      }

     })
    .catch((error) => {
      dispatch({
        verified: false,
        type: actionTypes.UPDATE_PROFILE_VERIFICATION
       })
    });
  }
}

export const reset = (store) => {
  
    var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    store: store
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch('http://localhost:8080/store/reset', request)
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson.success){
         dispatch({
            store: responseJson.store, 
            type: actionTypes.UPDATE_STORE
         })
         Actions.home();
      }
     })
    .catch((error) => {
    });
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      user: undefined,
      type: actionTypes.UPDATE_USER
    })
    dispatch({
      store: undefined,
      type: actionTypes.UPDATE_STORE
    })
    AsyncStorage.removeItem('token');
    Actions.login();
  }
}


export const updateProfileStore = (store, name, estmin) => {
  console.log(store + " " + name + " "  + estmin + "man");
  if(estmin == undefined){
    estmin = 0;
  }

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    store: store,
    name: name,
    estmin: estmin
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch('http://localhost:8080/store/update', request)
  .then((response) => response.json())
  .then((responseJson) => {
	    if(responseJson.success){
		    dispatch({
	          store: responseJson.store, 
	          type: actionTypes.UPDATE_STORE
	        })
        updateProfileStoreName(responseJson.store.name);
        if(responseJson.store.estmin != undefined){
          updateProfileEstMin("" +  responseJson.store.estmin);
        }
        
        Actions.home();
	    }else{
        throw Error(responseJson.error);
      }

	   })
	  .catch((error) => {
	  });
   }
}

export const updateProfilePassword = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_PASSWORD,
    verificationPassword: text,
  }
}

export const updateVerificationStatus = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_VERIFICATION,
    verified: text,
  }
}

export const updateProfileStoreName = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_STORENAME,
    storename: text,
  }
}

export const updateProfileEstMin = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_ESTMIN,
    estmin: text,
  }
}