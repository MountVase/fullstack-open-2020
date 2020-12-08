


export const setUser = (user) => {
  // we can set the whole user as an object, password is not saved, deleted in backend already. I think.
  return { type: 'SET_USER', data: user }
}

export const clearUser = () => {
  return { type: 'CLEAR_USER' }
}

export const signedInUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER': {
    return action.data
  }
  case 'CLEAR_USER': {
    return null
  }
  default: return state
  }
}