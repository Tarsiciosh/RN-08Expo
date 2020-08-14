import React from 'react';
import AddContactForm from '../AddContactForm';

import store from '../redux/store'
import { addContact } from '../redux/actions';
import { connect } from 'react-redux'

function AddContactScreen ({navigation, addContact}) {

  const handleSubmit = formState => {
    //store.dispatch(addContact({name: formState.name, phone: formState.phone}))
    addContact({name: formState.name, phone: formState.phone})
    navigation.navigate('ContactList')
  }
  
  return ( 
    <AddContactForm onSubmit= {handleSubmit} />
  )  
}
const mapStateToProps = null

const mapDispatchToProps = {addContact}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactScreen)

//the first argument is the mapStateToProps function 
//because we don't need to know about the changes of the state
//we pass null to this 

//the second argument is the bind part of the actions
//mapDispatchToProps
