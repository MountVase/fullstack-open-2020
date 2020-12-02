

export const displayNotification = notif => {
  return {
    type: 'NOTIFY',
    notification: notif
  }
}

let timeoutId = null

export const ezDisplayNotification = (notification, time) => {
  return async dispatch => {
    // can return timer in the data, will be triggered by Notification
    dispatch({ type: 'NOTIFY', notification: notification })
    
    if (timeoutId !== null) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)

  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR'
  }
}


const initialState = ''

// does reducer need Notif in object form, like {message: xx, style: xx}?
// maybe not, we can define styles in index.css and render them in Notification component much more intuitively
const notificationReducer = (state = initialState, action) => {

  switch(action.type) {
  case 'NOTIFY': {
    return action.notification
  }

  case 'CLEAR': {
    return ''
  }

  default: return state
  }
}

export default notificationReducer