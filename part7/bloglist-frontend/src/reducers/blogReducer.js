import blogService from '../services/blogService'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.create(blog)
    console.log('createBlog resp: ', response)
    dispatch({ type: 'CREATE', data: blog })

  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const response = await blogService.remove(id)
    console.log('removeBlog resp: ', response)
    dispatch({ type: 'DELETE', data: id })
  }
}

export const likeBlog = (id, updatedBlog) => {
  return async dispatch => {
    const response = await blogService.update(id, updatedBlog)
    console.log('like response', response)
    dispatch ({ type: 'LIKE', data: id })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    console.log('before sending comment off m8: ', comment)

    const response = await blogService.addComment(id, comment)
    console.log('actioncreator comment: ',response)
    dispatch({ type: 'COMMENT', data: { id: id, comment: comment }})
  }
}




export const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE': {
    // maybe.asObject instead? .map(asObjects) is only run to the anecdotesAtStart...
    return [...state, action.data]
  }
  case 'INIT_BLOGS': {
    return action.data
  }

  case 'DELETE': {
    return [...state.filter(blog => blog.id !== action.data)]
  }

  case 'LIKE': {
    const id = action.data

    const blog = state.find(blog => blog.id === id)

    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    return state.map(blog => blog.id !== id ? blog : newBlog)

  }

  case 'COMMENT': {
    const id = action.data.id
    const comment = action.data.comment


    const newBlog = state.find(blog => blog.id === id)
    newBlog.comments = [...newBlog.comments, comment]

    return state.map(blog => blog.id !== id ? blog : newBlog)
  }

  default: return state
  }


}

