import blogService from '../services/blogService'

export const initializeDb = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({ type: 'INIT_DB', data: blogs })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.create(blog)
    console.log(response)
    dispatch({ type: 'CREATE', data: blog })

  }
}


export const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE': {
    // maybe.asObject instead? .map(asObjects) is only run to the anecdotesAtStart...
    return [...state, action.data]
  }
  case 'INIT_DB': {
    return action.data
  }


  default: return state
  }


}

