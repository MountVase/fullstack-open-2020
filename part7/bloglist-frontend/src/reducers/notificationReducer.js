
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