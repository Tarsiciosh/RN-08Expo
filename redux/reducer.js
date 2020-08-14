import {combineReducers} from 'redux'
import {UPDATE_CONTACT, UPDATE_USER} from './actions'

const merge = (prev, next) => Object.assign({},prev,next) //old way

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {} , action) => {
  switch (action.type) {
    case UPDATE_USER: return merge(state, action.payload)
    case UPDATE_CONTACT: return merge(state, {prevContact: action.payload})
    default: return state
  }
} 

export default combineReducers ({
  user: userReducer,
  contacts: contactReducer,
})

/*
// more complex scenario
export const reducer = combineReducers ({
  user: combineReducers ({
    meta: userMetaReducer,
    logins: userLoginsReducer,
  }),
  contacts: contactReducer,
})*/