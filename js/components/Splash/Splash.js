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
       console.log("Splash Token Exists");
       //Actions.login()
       this.props.autoLogin(result);
       //this.props.updateVerificationRequired(true);
    	 Actions.mode({type: 'reset'});
    	}else if(err || !result){
        console.log("Splash Token Not Exists");
    		Actions.login({type: 'reset'});
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
