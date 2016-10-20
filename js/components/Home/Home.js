// @flow
import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Picker,
  Alert,
  NavigatorIOS,
} from 'react-native'

import InputNormal from '../../elements/InputNormal'
import CustomerCell from '../../elements/CustomerCell'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'

var updating;
export default class Home extends Component {
  constructor() {
    super();

    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._decrementSeats = this._decrementSeats.bind(this);
    this._incrementSeats = this._incrementSeats.bind(this);
    this._handleNewCustomer = this._handleNewCustomer.bind(this);
    this._handleRemoveCustomer = this._handleRemoveCustomer.bind(this);
    this._refreshing = this._refreshing.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    this.props.updateHomeSeats(1);
    updating = setInterval(this._refreshing, 10000);
  
  }

  componentWillUnmount() {
    clearInterval(updating);
  }

  _refreshing() {
    if(this.props.store != null){
       this.props.updateStore(this.props.store._id);
    }
  }

  _handleCurrentPhoneNumber(text) {

    var phoneNumber = text.match(/\d/g);
    if(phoneNumber != undefined){
      phoneNumber = phoneNumber.join("");
        if(phoneNumber.length >= 10)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10);
      else if(phoneNumber.length >= 7)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, phoneNumber.length);
      else if(phoneNumber.length >= 4)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, phoneNumber.length);
      else if(phoneNumber.length >= 1)
        phoneNumber = '(' + phoneNumber.substring(0, phoneNumber.length);
      else
        phoneNumber = '';
    }else{
      phoneNumber = '';
    }
    this.props.updateHomePhoneNumber(phoneNumber)
  }

   _decrementSeats() {
    if(this.props.homeSeats > 1){
      this.props.updateHomeSeats(parseInt(this.props.homeSeats) - 1)
    }
  }

  _incrementSeats() {
    if(this.props.homeSeats < 15){
     this.props.updateHomeSeats(parseInt(this.props.homeSeats) + 1)
    }
  }

  _handleNewCustomer() {

    if(this.props.homePhoneNumber == undefined || this.props.homePhoneNumber.length < 14){
      Alert.alert(
        "Sorry",
        "Please enter phone number",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.enqueue(this.props.store._id, this.props.homePhoneNumber, this.props.homeSeats)
  }

  _handleRemoveCustomer(customerId, phoneNumber, seats) {
    this.props.dequeue(this.props.store._id, customerId, phoneNumber, seats)
  }


  render() {
    var estmin = '';
    if(this.props.store != undefined && this.props.store.estmin && this.props.store.waiting){
      estmin = " (" + (this.props.store.estmin * this.props.store.waiting) + " MIN)";
    }
    console.log(this.props);
    return (
        <Swiper
          activeDot={<View style={{backgroundColor: 'transparent'}} />}
          dot={<View style={{backgroundColor:'transparent'}} />}
          loop={false}
          showsButtons={false}
          style={styles.wrapper}
        >
          {/*Slide 1*/}
          <View style={styles.slide1}>
            <View style={{flex: 3, justifyContent: 'space-between'}}>
           {/*<Text>
                {this.props.store ? this.props.store.name : ""}
              </Text>*/}
              <Text style={{fontFamily: 'Arial', fontWeight: 'bold', fontSize: 30}}>
                {this.props.store ? this.props.store.name : null}
              </Text>
              <View>
                <Text style={{fontFamily: 'Arial', fontWeight: 'bold', fontSize: 30}}>
                  GROUPS AHEAD
                </Text>
                <Text style={{fontFamily: 'Helvetica Neue', fontWeight: 'bold', fontSize: 65}}>
                  {this.props.store ? this.props.store.queue.length + estmin : ""}
                </Text>
              </View>

              <TextInput
                keyboardType='phone-pad'
                maxLength={14}
                onChangeText={this._handleCurrentPhoneNumber}
                placeholderTextColor='rgba(255,255,255,0.18)'
                placeholder='ENTER PHONE #'
                style={[styles.transInput, {marginBottom: 15}]}
                value={this.props.homePhoneNumber}
              />

            </View>
            <View style={styles.seatsRow}>
           
              
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                { this.props.homeSeats > 1 ? 
                <TouchableHighlight
                  onPress={this._decrementSeats}
                >
                  <Image
                    source={require('../../../public/assets/img/minus.png')}
                  />
                </TouchableHighlight>
                : null }
              </View>
              
              <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
                    {this.props.homeSeats}
                </Text>
              </View>
             
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                 { this.props.homeSeats < 15 ? 
                <TouchableHighlight
                  onPress={this._incrementSeats}
                >
                    <Image
                      source={require('../../../public/assets/img/plusFilled.png')}
                    />
                </TouchableHighlight>
                : null}
              </View>
                
              
            </View>
            <View style={{flex:3 , alignItems:'center'}}>
            <View style={{height: 45, flexDirection: 'row', marginBottom: 15}}>
              <View style={{flex: 1}}>
                <TouchableHighlight
                  onPress={this._handleNewCustomer}
                  style={styles.buttonContainer}
                  underlayColor='transparent'
                >
                  <Text style={styles.buttonText}>
                    RESERVE
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            </View>
          </View>
          {/*Slide 2*/}
          <View style={styles.slide2}>
            <ListView
              dataSource={this.props.store ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.queue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
              enableEmptySections={true}
              renderRow={(rowData) => <CustomerCell data={rowData} dequeue={this._handleRemoveCustomer} />}
            />
          </View>
          {/*Slide 3*/}
          <View style={styles.slide3}>
            <ListView
              dataSource={this.props.store && this.props.store.doneQueue ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.doneQueue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
              enableEmptySections={true}
              renderRow={(rowData) => <CustomerCell noRemove={true} data={rowData} dequeue={this._handleRemoveCustomer} />}
            />
          </View>
        </Swiper>
    )
  }
}

var styles = StyleSheet.create({
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
  wrapper: {
    backgroundColor: '#986B6C',
    paddingTop: 15,
  },
  slide1: {
    backgroundColor: '#986B6C',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#986B6C'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#986B6C'
  },
  seatsRow:{
    flex:1,
    flexDirection:'row'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  transInput: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'rgba(255,255,255,0.18)',
    height: 45,
    padding: 10,
    fontFamily: 'Arial',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
