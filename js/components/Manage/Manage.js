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
  Dimensions,
} from 'react-native'

import Tabs from 'react-native-tabs';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import InputNormal from '../../elements/InputNormal'
import CustomerCell from '../../elements/CustomerCell'
import { Actions } from 'react-native-router-flux'
import Emoji from 'react-native-emoji'

var flexRatio = (Dimensions.get('window').height / 100);

var updating;
export default class Manage extends Component {
  constructor() {
    super();

    this._handleRemoveCustomer = this._handleRemoveCustomer.bind(this);
    this._refreshing = this._refreshing.bind(this);
    this._dequeueAlert = this._dequeueAlert.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      page: 'waitlist'
    };
  }

  componentWillMount() {
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

  _dequeueAlert(){
    function removeCustomer(){
      //console.log(this.refs.waitlist._rows[this.refs.waitlist.openCellId].props.children[1].props.data.customer);
      this.props.removeCustomer(this.props.store._id, this.refs.waitlist._rows[this.refs.waitlist.openCellId].props.children[1].props.data.customer)
    };
    this.refs.waitlist.safeCloseOpenRow();
    var bindedRemoveCustomer = removeCustomer.bind(this);

    Alert.alert(
      'Confirmation',
      'Do you want to remove this customer from waitlist?',
      [
        {text: 'YES', onPress: bindedRemoveCustomer},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
    //this.props.store.queue[]
  }

  _handleRemoveCustomer(customerId, phoneNumber, seats) {
    this.props.dequeue(this.props.store._id, customerId, phoneNumber, seats)
  }

  render() {
    return (
        <View style={styles.slide1}>
          <View style={{flex:1, alignItems: 'flex-end'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableHighlight
                  onPress={Actions.mode.bind(this, {type: "reset"})}
                  underlayColor='transparent'
                  style={{paddingRight: 10}}
                >
                <Text style={{fontSize: 40}}><Emoji name="left_right_arrow"/></Text>
              </TouchableHighlight>
              <TouchableHighlight
                  onPress={Actions.profile.bind(this, {type: "reset"})}
                  underlayColor='transparent'
                  style={{paddingRight: 10}}
                >
                <Text style={{fontSize: 40}}><Emoji name="gear"/></Text>
              </TouchableHighlight>
            </View>
            <Tabs selected={this.state.page} style={{backgroundColor:'transparent', flex:1}}
                selectedStyle={{color:'black'}} onSelect={el=>this.setState({page:el.props.name})}>
                <Text name="waitlist" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'black'}}>Waitlist</Text>
                <Text name="customer" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'black'}}>Customers</Text>
            </Tabs>
          </View>
          <View style={{flex:flexRatio - 1}}>
            {this.state.page == "waitlist" ? 
              (<View style={styles.tabContainer}>
                  <View style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#FFEC56'}}>
                    <Text style={{fontFamily: 'Arial', fontWeight: 'bold', fontSize: 35, color: 'white'}}>Waitlist</Text>
                  </View>
                  <SwipeListView
                    ref="waitlist"
                    dataSource={this.props.store ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.queue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                    enableEmptySections={true}
                    renderRow={
                      (rowData) => 
                      <SwipeRow
                          rightOpenValue={-100}
                          disableRightSwipe={true}
                          closeOnRowPress={true}>
                        <View>
                          <TouchableHighlight style={{alignItems: 'flex-end', justifyContent: 'center', backgroundColor: 'red', height: Dimensions.get('window').width * 0.45}}>
                                  <Text style={{color: 'white', paddingRight: 5, fontSize: 35}}>Remove</Text>
                          </TouchableHighlight>
                        </View>
                        <CustomerCell ref={"row" + this.props.store.queue.indexOf(rowData)} data={rowData} dequeue={this._handleRemoveCustomer} />
                      </SwipeRow>
                    }
                    onRowOpen={this._dequeueAlert}
                    
                    
                    
                  />
                </View>): null}
            {this.state.page == "customer" ? 
              (<View style={styles.tabContainer}>
                  <View style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#FFEC56'}}>
                    <Text style={{fontFamily: 'Arial', fontWeight: 'bold', fontSize: 35, color: 'white'}}>Customers</Text>
                  </View>
                  <ListView
                    dataSource={this.props.store && this.props.store.doneQueue ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.doneQueue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                    enableEmptySections={true}
                    renderRow={(rowData) => <CustomerCell noRemove={true} data={rowData} dequeue={this._handleRemoveCustomer} />}
                  />
                </View>): null}
          </View>
        </View>
    )
  }
}

var styles = StyleSheet.create({
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
  wrapper: {
    backgroundColor: '#FFEC56',
    paddingTop: 15,
  },
  slide1: {
    backgroundColor: '#FFEC56',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})