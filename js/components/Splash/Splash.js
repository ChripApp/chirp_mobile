// @flow
import React, { Component } from 'react'
import {
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import InputNormal from '../../elements/InputNormal'

export default class Splash extends Component {
  constructor() {
    super();
    AsyncStorage.getItem('token', (err, result) => {
    	if(result){
       Actions.login();
    		// Actions.home();
      //   this.props.autoLogin(result);
    	}else if(err || !result){
    		Actions.login();
    	}
    	
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
         	Splash
        </Text>
      </View>
    )
  }
}