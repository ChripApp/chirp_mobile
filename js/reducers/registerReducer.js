// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
  onRegistering: false
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.UPDATE_REGISTER_PHONENUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }
    case actionTypes.UPDATE_REGISTER_FIRSTNAME:
      return {
        ...state,
        firstName: action.firstName
      }
    case actionTypes.UPDATE_REGISTER_LASTNAME:
      return {
        ...state,
        lastName: action.lastName
      }
    case actionTypes.UPDATE_REGISTER_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case actionTypes.UPDATE_REGISTER_STORENAME:
      return {
        ...state,
        storeName: action.storeName
      }

    default:
      return state
  }
}

export const getRegister = (state) => ({
  onRegistering: state.onRegistering,
  phoneNumber: state.phoneNumber,
  firstName: state.firstName,
  lastName: state.lastName,
  password: state.password,
  storeName: state.storeName
})
