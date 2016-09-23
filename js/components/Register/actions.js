// @flow
import * as actionTypes from '../../actionTypes'
import { getRegister } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'

// Action creators
export const register = () => {
  console.log('Register')
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
