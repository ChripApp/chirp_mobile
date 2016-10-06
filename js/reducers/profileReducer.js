// @flow weak
import * as actionTypes from '../actionTypes'


const DEFAULT_STATE = {
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.UPDATE_PROFILE_STORENAME:
      return {
        ...state,
        storename: action.storename
      }
    case actionTypes.UPDATE_PROFILE_ESTMIN:
      return {
        ...state,
        estmin: action.estmin
      }

    default:
      return state
  }
}

export const getProfile = (state) => ({
  estmin: state.estmin,
  storename: state.storename,
})