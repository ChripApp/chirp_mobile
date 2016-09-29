'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

class customerCell extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  }
  constructor() {
  	super();
  	this.state = {
  	};


  	this._timeElapsed = this._timeElapsed.bind(this);


  	this._loadCustomer = this._loadCustomer.bind(this);
  	this._dequeue = this._dequeue.bind(this);
  }
  formatPhoneNumber(num){
  	var sub1 = num.substring(2, 5);
  	var sub2 = num.substring(5, 8);
  	var sub3 = num.substring(8, 12);
  	return '(' + sub1 + ')' + sub2 + '-' + sub3;
  }

  _timeElapsed(){
	var startTime = new Date();
	
	var endTime = this.state.time;
	var timeDiff = startTime - endTime;
	console.log(endTime);
	timeDiff /= 1000;
	var seconds = Math.round(timeDiff % 60);
	timeDiff = Math.floor(timeDiff / 60);
	var minutes = Math.round(timeDiff % 60);
	timeDiff = Math.floor(timeDiff / 60);
	var hours = Math.round(timeDiff % 24);
	timeDiff = Math.floor(timeDiff / 24);
	var days = timeDiff;

	var returnText = "";
	if(days == 0 && hours == 0 && minutes == 0){
		returnText = seconds + " seconds ago";
	}else if(days == 0 && hours == 0){
		returnText = minutes + " minutes ago";
	}else if(days == 0){
		returnText = hours + " hours " + minutes  + " minutes ago";
	}else{
		returnText = days + " days ago";
	}

	console.log(returnText);
	return returnText;
  }

  _loadCustomer(data){
  	this.state.customerId = data.customer;
  	fetch('http://localhost:8080/store/getcustomer', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
	  body: JSON.stringify({
	    customer: data.customer,
	   })}).then((response) => response.json())
	  .then((responseJson) => {
	  	 if(responseJson.success){
	  	 	console.log(data);
	  	 	this.setState({
	  	 		time: data.time,
		     	phoneNumber: this.formatPhoneNumber(responseJson.customer.phoneNumber),
		     	seats: responseJson.customer.seats,
		     });
	  	 }
	     
	   })
	  .catch((error) => {
	    console.error(error);
	  });
  }
  componentWillMount() {
  	this._loadCustomer(this.props.data);
  }
  componentWillReceiveProps(newProps) {
  	this._loadCustomer(newProps.data);
  }

  _dequeue() {
  	this.props.dequeue(this.state.customerId, this.state.phoneNumber);
  }

  render() {
  	var ago = this._timeElapsed();
    return (

      <View>
      	<Text> {this.state.phoneNumber} </Text>
      	<Text> {this.state.seats} Seats </Text>
      	<Text> {ago} </Text>
      	{this.props.noRemove ? null : <TouchableHighlight onPress={this._dequeue}><Text> Remove </Text></TouchableHighlight>}
      </View>
    );
  }
}

export default customerCell