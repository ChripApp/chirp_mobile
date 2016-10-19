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

    case actionTypes.UPDATE_PROFILE_PASSWORD:
      return {
        ...state,
        verificationPassword: action.verificationPassword
      }

    case actionTypes.UPDATE_PROFILE_VERIFICATION:
      return {
        ...state,
        verified: action.verified
      }

    default:
      return state
  }
}

export const getProfile = (state) => ({
  verified: state.verified,
  verificationPassword: state.verificationPassword,
  estmin: state.estmin,
  storename: state.storename,
})