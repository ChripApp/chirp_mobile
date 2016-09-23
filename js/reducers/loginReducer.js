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

    case actionTypes.UPDATE_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case actionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    default:
      return state
  }
}

export const getLogin = (state) => ({
  onLogging: state.onLogging,
  username: state.username,
  password: state.password,
})
