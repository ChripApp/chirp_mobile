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
            <Scene component={Login} initial={true} hideNavBar key='login' sceneStyle={{backgroundColor: '#986B6C'}} title='Login Page'/>
            <Scene component={Register} hideNavBar={false} key='register' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#986B6C'}}/>
            <Scene component={Home} direction='vertical' key='home' sceneStyle={{backgroundColor: '#986B6C'}} title='Home' type='reset'/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
