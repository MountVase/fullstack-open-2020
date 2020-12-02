import React from 'react'
import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      dispatch(createAnecdote(content))
    }

    return (
        <div>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
          </div>
        <button>create</button>
      </form>
      </div>
    )
}

const mapStateToProps = (state) => {
  return null
}

const mapDispatchToProps = {
  createAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)