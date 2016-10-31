// @flow weak
import * as actionTypes from '../actionTypes'


const DEFAULT_STATE = {
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {

    case actionTypes.UPDATE_VERIFICATION_PASSWORD:
      return {
        ...state,
        verificationPassword: action.verificationPassword
      }

    case actionTypes.UPDATE_VERIFICATION:
      return {
        ...state,
        verified: action.verified
      }

    case actionTypes.UPDATE_VERIFICATIONREQUIRED:
      return {
        ...state,
        verificationRequired: action.verificationRequired
      }

    default:
      return state
  }
}

export const getMode = (state) => ({
  verified: state.verified,
  verificationRequired: state.verificationRequired,
  verificationPassword: state.verificationPassword,
})