import React from 'react';
import { Button, View, StyleSheet} from 'react-native';
import SectionListContacts from '../SectionListContacts';


import {connect} from 'react-redux'

function ContactListScreen ({route, navigation, contacts}) {
  //let contacts = store.getState().contacts
 
  React.useLayoutEffect ( () => {
    navigation.setOptions ({
      title: 'Contacts',
      headerRight: () => (
        <Button 
          title="Add"
          onPress={ () => navigation.navigate('AddContact')}
        />
      )
    })
  }, [navigation, route])

  let handleSelectContact = contact => {
    navigation.push('ContactDetails', contact) //doenst work
  }

  return (
    <View style={styles.container}>
      <SectionListContacts
        contacts={contacts}
        onSelectContact={handleSelectContact}
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  contacts: state.contacts
})
const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactListScreen)

