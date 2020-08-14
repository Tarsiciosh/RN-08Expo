import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App () {
  [randomContact, setRandomContact] = useState(null)
  
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

    setRandomContact(randomContact.data[0]) 
    console.log(randomContact.name)
  }

  return (
    <View style={styles.container}>
      <Button 
        title="press me please"
        onPress= { () => {
          _getRandomContactAsync()
        }}
      />
      {(randomContact && 
      (<Text> {randomContact.name} </Text>) || 
      null )}
      <StatusBar style="auto" />
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
