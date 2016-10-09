// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet
} from 'react-native'


export default class Profile extends Component {
  constructor() {
    super();
    this._handleCurrentStoreName = this._handleCurrentStoreName.bind(this);
    this._handleCurrentEstMin = this._handleCurrentEstMin.bind(this);
    this._updateStore = this._updateStore.bind(this);
    this._logout = this._logout.bind(this);
  }
  componentWillMount() {
    if(this.props.store){
      this.props.updateProfileStoreName(this.props.store.name);
      this.props.updateProfileEstMin("" + this.props.store.estmin);
    }
  }

  _handleCurrentStoreName(text) {
    this.props.updateProfileStoreName(text);
  }

  _handleCurrentEstMin(text) {
    this.props.updateProfileEstMin(text);
  }

  _updateStore() {
    this.props.updateProfileStore(this.props.store._id, this.props.storename, this.props.estmin)
  }

  _logout() {
    this.props.logout()
  }

  render() {
    console.log(this.props);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='STORE NAME'
          onChangeText={this._handleCurrentStoreName}
          value={this.props.storename}
        />
        <TextInput
          style={[styles.transInput, {marginBottom: 15}]}
          placeholderTextColor='rgba(255,255,255,0.18)'
          placeholder='EST MIN PER CUSTOMER'
          onChangeText={this._handleCurrentEstMin}
          value={this.props.estmin}
        />
        <View style={{height: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._updateStore}
                style={styles.buttonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  UPDATE
                </Text>
              </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._logout}
                style={styles.buttonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  LOGOUT
                </Text>
              </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    borderColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    color: '#986B6C',
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'rgba(255,255,255,0.18)',
    height: 45,
    padding: 15,
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})