// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native'


export default class Profile extends Component {
  constructor() {
    super();
    this.state = {

    };
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._handleCurrentStoreName = this._handleCurrentStoreName.bind(this);
    this._handleCurrentEstMin = this._handleCurrentEstMin.bind(this);
    this._updateStore = this._updateStore.bind(this);
    this._verify = this._verify.bind(this);
    this._reset = this._reset.bind(this);
    this._logout = this._logout.bind(this);
  }
  componentWillMount() {
    if(this.props.store){
      this.props.updateProfileStoreName(this.props.store.name);

      if(this.props.store.estmin != undefined){
        this.props.updateProfileEstMin("" + this.props.store.estmin);
      }else{
        this.props.updateProfileEstMin("");
      }
    }
  }

  componentWillUnmount(){
    this.props.updateVerificationStatus(false);
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    if(newProps.verified == true){
      this.setState({
        verified: true
      });
    }
  }

  _handleCurrentPassword(text) {
    this.props.updateProfilePassword(text);
  }

  _handleCurrentStoreName(text) {
    this.props.updateProfileStoreName(text);
  }

  _handleCurrentEstMin(text) {
    this.props.updateProfileEstMin(text);
  }

  _updateStore() {
    if(this.props.storename == undefined){
      Alert.alert(
        "Sorry",
        "Please enter the name of the store",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.updateProfileStore(this.props.store._id, this.props.storename, this.props.estmin)
  }

  _verify() {
    if(this.props.verificationPassword == undefined){
      Alert.alert(
        "Sorry",
        "Please enter password",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.verify(this.props.user.phoneNumber, this.props.verificationPassword)
  }

  _reset() {
    this.props.reset(this.props.store._id)
  }

  _logout() {
    this.props.logout()
  }

  render() {
    console.log(this.props);
    if(!this.state.verified)
      return (
      <View style={{flex: 1, padding: 45, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.titleText}>
          To continue, please enter your password
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this._handleCurrentPassword}
          placeholderTextColor='#88898C'
          placeholder='Enter Password'
          secureTextEntry={true}
          style={styles.transInput}
          value={this.props.verificationPassword}
        />
        <View style={{height: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._verify}
                style={styles.buttonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Verify
                </Text>
              </TouchableHighlight>
          </View>
        </View>
      </View>
      )
    else
      return (

      <View style={{flex: 1, padding: 45, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.transInput}
          placeholderTextColor='#88898C'
          placeholder='Enter Store Name'
          autoCorrect={false}
          onChangeText={this._handleCurrentStoreName}
          value={this.props.storename}
        />
        <TextInput
          style={styles.transInput}
          placeholderTextColor='#88898C'
          placeholder='Enter Estimated Wait Time:  Min/Customer'
          onChangeText={this._handleCurrentEstMin}
          value={this.props.estmin}
        />
        <View style={{height: 45, marginBottom: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._updateStore}
                style={styles.buttonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Update Info
                </Text>
              </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._reset}
                style={styles.buttonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Reset Store
                </Text>
              </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 45, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._logout}
                style={styles.logoutButtonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Log Out
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
    // backgroundColor: 'rgba(255,255,255,0.18)',
    // borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    // borderColor: 'black',
    // borderRadius: 25,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F3F1',
    borderColor: 'black',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonContainer: {
    // backgroundColor: 'rgba(255,255,255,0.18)',
    // borderWidth: 0,
    // borderColor: 'rgba(255,255,255,0.2)',
    // borderColor: 'black',
    // borderRadius: 25,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderColor: 'black',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    // color: '#986B6C',
    // fontSize: 13,
    // fontFamily: 'Helvetica Neue',
    // fontWeight: 'bold',
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // borderWidth: 1,
    // borderRadius: 25,
    // borderColor: 'rgba(255,255,255,0.18)',
    // height: 45,
    // padding: 15,
    // fontFamily: 'Helvetica Neue',
    // fontSize: 13,
    // textAlign: 'center',
    // fontWeight: 'bold',
    backgroundColor: 'white',
    borderColor: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    fontWeight: '200',
    height: 45,
    padding: 15,
  },
  titleText: {
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Arial',
    fontSize: 40,
    fontWeight: 'bold',
  },
})
