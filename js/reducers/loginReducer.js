// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
  onLogging: false
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.ON_LOGGING:
      return {
        ...state,
        onLogging: true
      }

    case actionTypes.UPDATE_LOGIN_PHONENUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }

    case actionTypes.UPDATE_LOGIN_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true
      }

    default:
      return state
  }
}

export const getLogin = (state) => ({
  onLogging: state.onLogging,
  phoneNumber: state.phoneNumber,
  password: state.password,
  loginSuccess: state.loginSuccess,
})
