

let timeoutId = null

// this action creator does a lot
export const displayNotification = (notification, time) => {
  return async dispatch => {
    dispatch({ type: 'NOTIFY', notification: notification })

    if (timeoutId !== null) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)

  }
}
// this action creator does less
export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}


export const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFY': {
    return action.notification
  }
  case 'CLEAR': {
    return ''
  }
  default: return state
  }

}