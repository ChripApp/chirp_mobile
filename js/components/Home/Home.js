// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Picker
} from 'react-native'

import InputNormal from '../../elements/InputNormal'
import CustomerCell from '../../elements/CustomerCell'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'



var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#92BBD9',
  },
  phoneInput:{
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    height: 50
  },
  seatsRow:{
    flex:1, 
    flexDirection:'row'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

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
    this.props.updateHomeSeats(2);
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
    this.props.updateHomePhoneNumber(text)
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
    this.props.enqueue(this.props.store._id, this.props.homePhoneNumber, this.props.homeSeats)
  }

  _handleRemoveCustomer(customerId, phoneNumber) {
    this.props.dequeue(this.props.store._id, customerId, phoneNumber)
  }


  render() {
    var estmin = '';
    if(this.props.store != undefined){
      estmin = "(" + (this.props.store.estmin * this.props.store.waiting) + "min)";
    }
    console.log(this.props);
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <View style={{flex:3, alignItems:'center', justifyContent: 'flex-end'}}>
              <Text>
                {this.props.store ? this.props.store.name : ""}
              </Text>
              <Text>
                {this.props.store ? this.props.store.queue.length + estmin + " groups are waiting now" : ""}
              </Text>
              <InputNormal
                style={styles.phoneInput}
                placeholder='Phone Number'
                dataDetectorTypes="phoneNumber"
                onChangeText={this._handleCurrentPhoneNumber}
                value={this.props.homePhoneNumber}
              />
            </View>

            <View style={styles.seatsRow}>
              <TouchableHighlight style={{flex:1, alignItems:'center', justifyContent:'center'}} onPress={this._decrementSeats}>
                <Text style={{color: '#999999', fontSize: 17.2}}>
                  Decrement
                </Text>
              </TouchableHighlight>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
                    { this.props.homeSeats }
                </Text>
              </View>
              <TouchableHighlight style={{flex:1, alignItems:'center', justifyContent:'center'}} onPress={this._incrementSeats}>
                <Text style={{color: '#999999', fontSize: 17.2}}>
                  Increment
                </Text>
              </TouchableHighlight>
            </View>

            <View style={{flex:3, alignItems:'center'}}>
              <TouchableHighlight onPress={this._handleNewCustomer}>
                <Text style={{color: '#999999', fontSize: 17.2}}>
                  Register
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.slide2}>
            <ListView
              enableEmptySections={true}
              dataSource={this.props.store ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.queue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
              renderRow={(rowData) => <CustomerCell data={rowData} dequeue={this._handleRemoveCustomer} />}
            />
          </View>
          <View style={styles.slide3}>
            <ListView
              enableEmptySections={true}
              dataSource={this.props.store && this.props.store.doneQueue ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.doneQueue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
              renderRow={(rowData) => <CustomerCell noRemove={true} data={rowData} dequeue={this._handleRemoveCustomer} />}
            />
          </View>
        </Swiper>
      
    )
  }
}
