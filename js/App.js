// @flow
import React, { Component } from 'react'
import {
  Actions,
  Router,
  Scene
} from 'react-native-router-flux'
import {
  Provider,
  connect
} from 'react-redux'
import configureStore from './store/configureStore'
import { AsyncStorage } from 'react-native'

import Login from './components/Login'
import Splash from './components/Splash'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'

const RouterWithRedux = connect()(Router)
const store = configureStore()

export default class App extends Component {

  render() {
    //  sceneStyle={{backgroundColor: '#986B6C'}}
    console.log(this.props);
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='root' barButtonIconStyle={{ tintColor: 'black' }}>
            <Scene component={Splash} initial={true} key='splash' title='Splash Page'/>
            <Scene component={Login} hideNavBar key='login' sceneStyle={{backgroundColor: '#FFEC56'}}/>
            <Scene component={Register} hideNavBar={false} key='register' navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} sceneStyle={{backgroundColor: '#FFEC56'}} backButtonTextStyle={{color: 'black'}}/>
            <Scene key="main" onRight={() => Actions.profile()} navigationBarStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} barButtonIconStyle={{ tintColor: 'black' }}>
              <Scene
                component={Home}
                initial={true}
                key='home'
                rightTitle='Profile'
                sceneStyle={{backgroundColor: '#FFEC56'}}
                type='reset'
              />
              <Scene
                component={Profile}
                direction='vertical'
                rightTitle=''
                key='profile'
                sceneStyle={{backgroundColor: '#FFEC56'}}
              />
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
