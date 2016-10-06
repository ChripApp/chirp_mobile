import * as actionTypes from '../../actionTypes'
import { getLogin, getProfile } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
} from 'react-native'

export const profile = () => {
  console.log('Profile')
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
	    }else{
        throw Error(responseJson.error);
      }

	   })
	  .catch((error) => {
	  });
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