import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer' 
import filterReducer from './reducers/filterReducer'

// these names: anecdotes and notifications, feed into the useSelector(state => state.anecdotes)

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})

export const store = createStore(reducer, composeWithDevTools())
