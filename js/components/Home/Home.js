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
    this.props.updateHomePhoneNumber(text)
  }

   _decrementSeats() {
    if(this.props.homeSeats > 0){
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
    
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <TouchableHighlight onPress={this._handleNewCustomer}>
              <Text style={{color: '#999999', fontSize: 17.2}}>
                Profile
              </Text>
            </TouchableHighlight>
            <Text>
              {this.props.store ? this.props.store.name : ""}
            </Text>
            <Text>
              {this.props.store ? this.props.store.queue.length + " groups are waiting now" : ""}
            </Text>
            <InputNormal
              placeholder='Phone Number'
              dataDetectorTypes="phoneNumber"
              onChangeText={this._handleCurrentPhoneNumber}
              value={this.props.homePhoneNumber}
            />
            <TouchableHighlight onPress={this._decrementSeats}>
              <Text style={{color: '#999999', fontSize: 17.2}}>
                Decrement
              </Text>
            </TouchableHighlight>
            <Text>
                { this.props.homeSeats }
            </Text>
            <TouchableHighlight onPress={this._incrementSeats}>
              <Text style={{color: '#999999', fontSize: 17.2}}>
                Increment
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._handleNewCustomer}>
              <Text style={{color: '#999999', fontSize: 17.2}}>
                Register
              </Text>
            </TouchableHighlight>
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
