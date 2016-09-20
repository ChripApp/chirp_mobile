// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

export default class Home extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          This is Home page
        </Text>
      </View>
    )
  }
}
