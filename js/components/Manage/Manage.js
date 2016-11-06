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
import Icon from 'react-native-vector-icons/Ionicons';

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
      page: 'Waitlist'
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
    bindedRemoveCustomer();
    // Alert.alert(
    //   'Confirmation',
    //   'Do you want to remove this customer from waitlist?',
    //   [
    //     {text: 'YES', onPress: bindedRemoveCustomer},
    //     {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //   ]
    // )
    //this.props.store.queue[]
  }

  _handleRemoveCustomer(customerId, phoneNumber, seats) {
    this.props.dequeue(this.props.store._id, customerId, phoneNumber, seats)
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{height: 20}}></View>
          <View style={{flex:1, alignItems: 'flex-end'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <TouchableHighlight
                  onPress={Actions.profile}
                  underlayColor='transparent'
                  style={{paddingRight: 270, paddingTop: 11}}
                >
                    <Image
                      source={require('../../../public/assets/img/settingsIcon.png')}
                      style={{width: 35, height: 35}}
                    />
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight
                    onPress={Actions.mode}
                    underlayColor='transparent'
                    style={{paddingRight: 15, paddingTop: 11}}
                  >
                    <Image
                      source={require('../../../public/assets/img/crossIcon.png')}
                      style={{width: 35, height: 35}}
                    />
                </TouchableHighlight>
              </View>
            </View>
            <Tabs selected={this.state.page} style={{backgroundColor:'transparent', flex:1}}
                selectedStyle={{color:'black'}} onSelect={el=>this.setState({page:el.props.name})}>
                <Text name="Waitlist" selectedIconStyle={{borderBottomWidth:0, borderBottomColor:'black'}} style={styles.tabButtonText}>
                  Waitlist
                </Text>
                <Text name="Customer" selectedIconStyle={{borderBottomWidth:0, borderBottomColor:'black'}}  style={styles.tabButtonText}>
                  Customers
                </Text>
            </Tabs>
          </View>
          <View style={{flex:flexRatio - 1}}>
            {this.state.page == "Waitlist" ?
              (<View style={styles.tabContainer}>
                  <SwipeListView
                    ref="waitlist"
                    enableEmptySections={true}
                    dataSource={this.props.store ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.queue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                    renderRow={
                      (rowData) =>
                      <SwipeRow
                        rightOpenValue={-Dimensions.get('window').width * 1.30}
                        disableRightSwipe={true}
                        closeOnRowPress={true}
                      >
                        <View>
                          <TouchableHighlight style={{alignItems: 'flex-end', justifyContent: 'center', backgroundColor: 'red', height: Dimensions.get('window').width * 0.45}}>
                            <Text style={{color: 'black', fontFamily: 'Arial', fontSize: 35, fontWeight: 'bold', paddingRight: 15,}}>
                              Remove
                            </Text>
                          </TouchableHighlight>
                        </View>
                        <CustomerCell
                          backgroundColor={this.props.store.queue.indexOf(rowData) % 3 == 0 ? "#FFEF77" : this.props.store.queue.indexOf(rowData) % 3 == 1 ? "#FFED66" : this.props.store.queue.indexOf(rowData) % 3 == 1 ? "#FFEC56" : "#FFEC56"}
                          ref={"row" + this.props.store.queue.indexOf(rowData)}
                          data={rowData}
                          dequeue={this._handleRemoveCustomer}/>
                      </SwipeRow>
                    }
                    onRowOpen={this._dequeueAlert}
                  />
                </View>): null}
            {this.state.page == "Customer" ?
              (<View style={styles.tabContainer}>
                  <ListView
                    dataSource={this.props.store && this.props.store.doneQueue ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.doneQueue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                    enableEmptySections={true}
                    renderRow={(rowData) =>
                      <CustomerCell
                        backgroundColor={"#FFEF77"}
                        noRemove={true}
                        data={rowData}
                        dequeue={this._handleRemoveCustomer}
                      />
                    }
                  />
                </View>): null}
          </View>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFEC56',
    paddingTop: 15,
  },
  tabContainer: {
    flex: 1
  },
  container: {
    backgroundColor: '#FFEC56',
    flex: 1,
  },
  tabButtonText: {
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'Arial',
    fontSize: 27,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
