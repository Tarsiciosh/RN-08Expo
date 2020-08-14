//action types:
const UPDATE_CONTACT = 'UPDATE_CONTACT'
const UPDATE_USER = 'UDPATE_USER'

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer
    this.state = initialState
  }

  getState (){
    return this.state
  }

  dispatch (update) {
    this.state = this.reducer(this.state, update) 
  }
}

const DEFAULT_STATE = {user: {}, contacts: []}

/*
//first aproach
const merge = (prev, next) => Object.assign({},prev,next) //old way
const contactReducer = (state, newContact) => [...state, newContact]
const userReducer = (state, update) => merge(state,update) 

const reducer = (state, action) => {
  if (action.type === UPDATE_USER){
    return merge(
      state,
      {user: userReducer(state.user, action.payload)}
    )
  }
  if (action.type === UPDATE_CONTACT ) {
    return merge (
      state,
      {contacts: contactReducer (state.contacts, action.payload)}
    )
  }
  return state
}
*/

//second aproach
const merge = (prev, next) => Object.assign({},prev,next) //old way

const contactReducer = (state, action) => {
  if (action.type === UPDATE_CONTACT)
    return [...state, action.payload]
  return state
}

const userReducer = (state, action) => {
  if (action.type === UPDATE_USER) return merge(state, action.payload)
  if (action.type === UPDATE_CONTACT) return merge(state, {prevContact: action.payload})
  return state
} 

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
})

//actions creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

const store = new Store (reducer, DEFAULT_STATE)

store.dispatch (updateUser({foo: 'foo'}))
store.dispatch (updateUser({bar: 'bar'}))
store.dispatch (updateUser({foo: 'baz'}))
store.dispatch (addContact({name: 'jordan',  phone:'1234567890'}))
store.dispatch (addContact({name: 'pepe',  phone:'1234567890'}))

console.log(store.getState())

/*
let state = {}
state = reducer (state, {foo: 'foo'})
state = reducer (state, {bar: 'bar'})
state = reducer (state, {foo: 'baz'})
*/
