// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'
// const ds;
export default class Store extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{paddingTop: 74}}>
        <Text>
          This is Store page
        </Text>
      </View>
    )
  }
}
