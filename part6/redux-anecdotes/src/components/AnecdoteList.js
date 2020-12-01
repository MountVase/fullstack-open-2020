import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    // check filtering here before rendering.

    
    const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes.sort((a, b) => b.votes - a.votes)
      }
      else {
        return state.anecdotes.filter(anec => anec.content.toLowerCase()
        .includes(state.filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)}})
 
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
      const id = anecdote.id
      dispatch(addVote(anecdote))

      const currentAnecdote = anecdotes.find(a => a.id === id)
      dispatch(displayNotification(`you voted ${currentAnecdote.content}`))
      
      setTimeout(() => {
        dispatch(displayNotification(''))
      }, 5000)
    }

    
    return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList