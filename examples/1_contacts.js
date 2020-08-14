import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimension, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

//import * as Location from 'expo-location'
//import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

export default class App extends Component {
  state = {
    randomContact: null,
  }

  _getRandomContactAsync = async () => {
    const {status} = await Contacts.requestPermissionsAsync()
     
    if (status !== 'granted') {
      console.error("persmission not granted")
      return
    }
   
    let contacts = await Contacts.getContactsAsync ({
      pageSize: 1,
      pageOffset: 0,
      fields:[ Contacts.Fields.PhoneNumbers]
    })

    let {total} = contacts
    let n = Math.floor(Math.random()*total);

    console.log(n)
    let randomContact = await Contacts.getContactsAsync({
      pageSize: 1,
      pageOffset: n,
      fields:[ Contacts.Fields.PhoneNumbers]
    })
    console.log(randomContact.data[0])

    this.setState ({
      randomContact: randomContact.data[0],
    })
    console.log(this.state.randomContact.name)
  }
   
  render(){
    return (
      <View style={styles.container}>
        <Button 
          title="press me"
          onPress= { () => {
            this._getRandomContactAsync()
          }}
        />
        {(this.state.randomContact && 
        (<Text> {this.state.randomContact.name} </Text>) || 
        null )}
        <StatusBar style="auto" />
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})