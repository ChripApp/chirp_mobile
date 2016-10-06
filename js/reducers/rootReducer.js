// @flow weak
import { combineReducers } from 'redux'
import nav, * as fromNav from './navReducer'
import login, * as fromLogin from './loginReducer'
import register, * as fromRegister from './registerReducer'
import home, * as fromHome from './homeReducer'
import profile, * as fromProfile from './profileReducer'

export default combineReducers({
  nav,
  login,
  register,
  home,
  profile,
})

//Like getNav:nav
export const getNav = (state) => fromNav.getNav(state.nav)

//Like getLogin:login
export const getLogin = (state) => fromLogin.getLogin(state.login)

//Like getRegister:register
export const getRegister = (state) => fromRegister.getRegister(state.register)

//Like getHome:home
export const getHome = (state) => fromHome.getHome(state.home)

//Like getProfile:profile
export const getProfile = (state) => fromProfile.getProfile(state.profile)