// @flow
import * as actionTypes from '../../actionTypes'
import { Actions } from 'react-native-router-flux'

// Action creators
export const register = () => {
  console.log('Home')
}
export const updateStore = (store) => {
   return dispatch => {
   	fetch('http://localhost:8080/store/getstore', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
	  	body: JSON.stringify({
	    store: store,
	   })}).then((response) => response.json())
	  .then((responseJson) => {
	    if(responseJson.success){
		  dispatch({store: responseJson.store , type: actionTypes.UPDATE_STORE})
	    }

	   })
	  .catch((error) => {
	    console.error(error);
	  });
   }
}
export const enqueue = (store, phoneNumber, seats) => {
  
  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  return dispatch => {
  fetch('http://localhost:8080/store/enqueue', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  	body: JSON.stringify({
    phoneNumber: phoneNumber,
    seats: seats,
    store: store
   })}).then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success){
	  dispatch({store: responseJson.store , type: actionTypes.UPDATE_STORE})
      dispatch({homePhoneNumber: "" , type: actionTypes.UPDATE_HOME_PHONENUMBER})
      dispatch({homeSeats: "1" , type: actionTypes.UPDATE_HOME_SEATS})
    }

   })
  .catch((error) => {
    console.error(error);
  });

  }
}

export const dequeue = (store, customer, phoneNumber) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  return dispatch => {
  fetch('http://localhost:8080/store/dequeue', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  body: JSON.stringify({
    store: store,
    customer: customer,
    phoneNumber: phoneNumber
   })}).then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success){
    	dispatch({store: responseJson.store , type: actionTypes.UPDATE_STORE})
    }

   })
  .catch((error) => {
    console.error(error);
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
