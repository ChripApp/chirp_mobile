// @flow
import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

const RouterWithRedux = connect()(Router)
const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root'>
            <Scene initial={true} key='login' component={Login} title='Login Page'/>
            <Scene key='register' component={Register} title='Register'/>
            <Scene key='home' component={Home} title='Home'/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
