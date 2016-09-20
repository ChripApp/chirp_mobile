// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

export default class Skeleton extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Skeleton
        </Text>
      </View>
    )
  }
}
