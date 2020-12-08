import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { notificationReducer } from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducer'
import { signedInUserReducer } from './reducers/signedInUserReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  signedInUser: signedInUserReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))
