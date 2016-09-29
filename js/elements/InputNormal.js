'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';

class InputNormal extends Component {
  static propTypes = {
    style: React.PropTypes.any,
    placeholder: React.PropTypes.string,
    onChangeText: React.PropTypes.func,
  }

  render() {
    var pr = this.props;
    var style = pr.style;
    var value = pr.value

    return (
      <TextInput
        style={[{fontWeight: 'bold', height: 20.5, color: '#999999'}, style]}
        placeholderStyle={{fontWeight: 'bold'}}
        placeholderTextColor='#999999'
        placeholder={pr.placeholder}
        onChangeText={pr.onChangeText}
        value={value}
        keyboardType={pr.keyboardType ? pr.keyboardType : "default"}
      />
    );
  }
}

export default InputNormal
