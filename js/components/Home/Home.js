// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'
// const ds;
export default class Home extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      stores: [],
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    fetch('http://localhost:8080/user/mystore', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: "57e0ea3f93df9c70a7a2299e",
      })}).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
       if(responseJson.success){
         this.state.stores = [];
         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          for(var i = 0; i < responseJson.stores.length; i++){
           this.state.stores.push(responseJson.stores[i]);
          }
          this.setState({
              dataSource: ds.cloneWithRows(this.state.stores)
          });
       }
        
      })
      .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <View style={{paddingTop: 74}}>
        <Text>
          This is Home page
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) => 
            <TouchableHighlight 
              onPress={Actions.store}
              >
              <Text>{rowData.name}</Text>
            </TouchableHighlight>}
        />
      </View>
    )
  }
}
