

export const displayNotification = notif => {
  return {
    type: 'NOTIFY',
    notification: notif
  }
}

export const ezDisplayNotification = (notification, time) => {
  return async dispatch => {
    // can return timer in the data, will be triggered by Notification
    const timer = setTimeout(() => {
      displayNotification('')
    }, time * 1000)

    dispatch({ type: 'NOTIFY', notification: [ notification, timer] })
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

  default: return state
  }
}

export default notificationReducer