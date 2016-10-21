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
  console.log('Home')
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
  fetch('http://' + actionTypes.LOCAL_IP + ':8080/store/getstore', request)
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

export const enqueue = (store, phoneNumber, seats) => {
  
  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    phoneNumber: phoneNumber,
    seats: seats,
    store: store
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  fetch('http://' + actionTypes.LOCAL_IP + ':8080/store/enqueue', request)
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success){
	    dispatch({
        store: responseJson.store , 
        type: actionTypes.UPDATE_STORE
      })
      dispatch({
        homePhoneNumber: "" , 
        type: actionTypes.UPDATE_HOME_PHONENUMBER
      })
      dispatch({
        homeSeats: "1" , 
        type: actionTypes.UPDATE_HOME_SEATS
      })
    }else{
      throw Error(responseJson.error);
    }

   })
  .catch((error) => {
    switch(error.message){
      case 'enqueueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });

  }
}

export const dequeue = (store, customer, phoneNumber, seats) => {

  console.log(store + "  " + customer);
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
  fetch('http://' + actionTypes.LOCAL_IP + ':8080/store/dequeue', request)
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

export const updateHomePhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_HOME_PHONENUMBER,
    homePhoneNumber: text,
  }
}

export const updateHomeSeats = (text) => {
  return {
    type: actionTypes.UPDATE_HOME_SEATS,
    homeSeats: text,
  }
}
