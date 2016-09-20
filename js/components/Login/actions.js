// @flow
import * as actionTypes from '../../actionTypes'
import { getLogin } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'

// Action creators
export const login = () => {
  Actions.loginTwo
  return {type: actionTypes.ON_LOGGING}
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

export const updateUsername = (text) => {
  return {
    type: actionTypes.UPDATE_USERNAME,
    username: text,
  }
}

export const updatePassword = (text) => {
  return {
    type: actionTypes.UPDATE_PASSWORD,
    password: text,
  }
}
