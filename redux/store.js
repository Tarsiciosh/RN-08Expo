import {createStore} from 'redux'
import reducer from './reducer'
import {addContact} from './actions'

const store = createStore (reducer)

store.dispatch(addContact({name:'John Appleseed', phone: '5555-55555'}))
store.dispatch(addContact({name:'Peter Malek', phone: '4444-444444'}))
store.dispatch(addContact({name:'Jordan Hahashi', phone: '33333-333333'}))
store.dispatch(addContact({name:'Sebastian Bach', phone: '222222-222222'}))

export default store