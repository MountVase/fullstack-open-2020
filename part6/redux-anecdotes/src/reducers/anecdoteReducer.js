import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.updateNew(newAnecdote)
    dispatch({ type: 'VOTE', data: newAnecdote})
  }
  
}

export const createAnecdote = (content) => {
  return async dispatch => {
    await anecdoteService.createNew(content)
    
    dispatch({ type: 'CREATE', data: content })
  }

}

export const initializeDb = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT_DB', data: anecdotes })
  }
}



const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdote = state.find(anec => anec.id === id)
      console.log(anecdote)
      const newAnecdote = {
        ...anecdote, 
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : newAnecdote)
    }
    case 'CREATE': {
      // maybe.asObject instead? .map(asObjects) is only run to the anecdotesAtStart...
      return [...state, asObject(action.data)]
    }

    case 'INIT_DB': {
      return action.data
    }
    

    default:
  }

  return state
}

export default anecdoteReducer