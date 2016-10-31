// @flow
import * as actionTypes from '../../actionTypes'
import { Actions } from 'react-native-router-flux'
import {
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


// Action creators
export const register = () => {
}

export const updateStore = (store) => {
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
  fetch('http://' + actionTypes.LOCAL_IP + '/store/getstore', request)
  .then((response) => response.json())
  .then((responseJson) => {
	    if(responseJson.success){
		    dispatch({
          store: responseJson.store , 
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
export const removeCustomer = (store,customer) => {

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    store: store,
    customer: customer,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  fetch('http://' + actionTypes.LOCAL_IP + '/store/removeCustomer', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
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
      case 'dequeueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });

  }
}
export const dequeue = (store, customer, phoneNumber, seats) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    store: store,
    customer: customer,
    phoneNumber: phoneNumber,
    seats: seats,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  fetch('http://' + actionTypes.LOCAL_IP + '/store/dequeue', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
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
      case 'dequeueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });

  }
}
