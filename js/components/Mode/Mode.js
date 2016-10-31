// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class Profile extends Component {
  constructor() {
    super();
    this.state = {

    };
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._verify = this._verify.bind(this);
    this._goCustomerMode = this._goCustomerMode.bind(this);
    this._goManagerMode = this._goManagerMode.bind(this);

  }

  _handleCurrentPassword(text) {
    this.props.updateProfilePassword(text);
  }

  componentWillMount() {
    if(this.props.verificationRequired)
      this.props.navigationState.hideNavBar = false;
  }

  _verify() {
    console.log(this.props);
    if(this.props.verificationPassword == undefined){
      Alert.alert(
        "Sorry",
        "Please enter password",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }else if(this.props.user == undefined){
      Alert.alert(
        "Sorry",
        "Please try again in one minute",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.verify(this.props.user.phoneNumber, this.props.verificationPassword)
  }

  _goCustomerMode() {
    Actions.main({type: "reset"})
    this.props.updateVerificationRequired(true);
    this.props.updateVerificationStatus(false);
    this.props.updateProfilePassword("");
  }

  _goManagerMode() {
    Actions.manage({type: "reset"});
    
  }

  render() {
    if(!this.props.verified)
      return (
      <View style={{flex: 1, padding: 45, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.titleText}>
          To continue, please enter your password
        </Text>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
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
              <View style={{height:45}}>
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
      </View>
      )
    else
      return (

      <View style={{flex: 1, padding: 45, justifyContent: 'center', alignItems: 'center'}}>
      	<Text style={styles.infoText}> Select Mode </Text>
        <TouchableHighlight
                onPress={this._goCustomerMode}
                underlayColor='transparent'
              >
         <Text style={styles.chirpButtonText}>CUSTOMER MODE</Text>
        </TouchableHighlight>
        <TouchableHighlight
                onPress={this._goManagerMode}
                underlayColor='transparent'
              >
         <Text style={styles.chirpButtonText}>MANAGER MODE</Text>
        </TouchableHighlight>
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
  chirpButtonText: {
    fontFamily: 'Arial',
    fontSize: Dimensions.get('window').width * 0.08,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.3)',
  },
  infoText: {
    fontFamily: 'Arial',
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
  }
})
