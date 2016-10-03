// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

export default class Profile extends Component {
  constructor() {
    super();
  }

  //USE A SCROLL VIEW FOR THIS PAGE

  render() {

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Profile
        </Text>
      </View>
    )
  }
}
