// @flow weak
import * as actionTypes from '../actionTypes'

const DEFAULT_STATE = {
  onLogging: false
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.UPDATE_HOME_PHONENUMBER:
      return {
        ...state,
        homePhoneNumber: action.homePhoneNumber
      }

    case actionTypes.UPDATE_HOME_SEATS:
      return {
        ...state,
        homeSeats: action.homeSeats
      }

    default:
      return state
  }
}

export const getHome = (state) => ({
  homePhoneNumber: state.homePhoneNumber,
  homeSeats: state.homeSeats
})
