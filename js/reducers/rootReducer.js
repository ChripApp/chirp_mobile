// @flow weak
import { combineReducers } from 'redux'
import nav, * as fromNav from './navReducer'
import login, * as fromLogin from './loginReducer'
import register, * as fromRegister from './registerReducer'

export default combineReducers({
  nav,
  login,
  register,
})

//Like getNav:nav
export const getNav = (state) => fromNav.getNav(state.nav)

//Like getLogin:login
export const getLogin = (state) => fromLogin.getLogin(state.login)

//Like getRegister:register
export const getRegister = (state) => fromRegister.getRegister(state.register)