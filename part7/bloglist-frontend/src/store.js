import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { notificationReducer } from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducer'
import { signedInUserReducer } from './reducers/signedInUserReducer'
import { userReducer } from './reducers/userReducer'


import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  signedInUser: signedInUserReducer,
  users: userReducer
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
