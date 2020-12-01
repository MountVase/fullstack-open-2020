import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer' 


// these names: anecdotes and notifications, feed into the useSelector(state => state.anecdotes)

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
})

export const store = createStore(reducer, composeWithDevTools())
