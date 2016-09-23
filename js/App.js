// @flow
import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore'
import {
  AsyncStorage
} from 'react-native'


import Login from './components/Login'
import Splash from './components/Splash'
import Register from './components/Register'
import Home from './components/Home'
import Store from './components/Store'

const RouterWithRedux = connect()(Router)
const store = configureStore()

export default class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root'>
            <Scene initial={true} key='splash' component={Splash} title='Splash Page'/>
            <Scene key='login' component={Login} title='Login Page'/>
            <Scene key='register' component={Register} title='Register'/>
            <Scene key='home' component={Home} title='Home'/>
            <Scene key='store' component={Store} title='Store'/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
