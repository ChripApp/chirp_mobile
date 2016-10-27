'use strict';

import * as actionTypes from '../actionTypes'
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
		returnText = seconds + " Sec Ago";
	}else if(days == 0 && hours == 0){
		returnText = minutes + " Min Ago";
	}else if(days == 0){
		returnText = hours + " Hrs " + minutes  + " Min Ago";
	}else{
		returnText = days + " Days Ago";
	}
	return returnText;
  }

  _loadCustomer(data){
  	this.state.customerId = data.customer;
  	fetch('http://' + actionTypes.LOCAL_IP + '/store/getcustomer', {
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
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  componentWillReceiveProps(newProps) {
    if(this._mounted)
  	 this._loadCustomer(newProps.data);
  }

  _dequeue() {
  	this.props.dequeue(this.state.customerId, this.state.phoneNumber, this.state.seats);
  }

  render() {
  	var ago = this._timeElapsed();
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          	<Text style={styles.infoText}> {this.state.seats} Seats </Text>
            <Text style={styles.infoText}> {this.state.phoneNumber} </Text>
          	<Text style={styles.infoText}> {ago} </Text>
            {this.props.noRemove ?
              null
            :
              <TouchableHighlight
                onPress={this._dequeue}
                underlayColor='#transparent'
              >
                <Text style={styles.chirpButtonText}>CHIRP!</Text>
              </TouchableHighlight>
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // textContainer: {
  //   flex: 1,
  //   flexDirection: 'column'
  // },
  rowContainer: {
    padding: 15,
    flex: 1,
    alignItems: 'flex-end',
  },
  chirpButtonText: {
    fontFamily: 'Arial',
    fontSize: 70,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.3)',
  },
  infoText: {
    fontFamily: 'Arial',
    fontSize: 40,
    fontWeight: 'bold',
  }
})

export default customerCell
