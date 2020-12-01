

export const displayNotification = notif => {
    return {
        type: 'NOTIFY',
        notification: notif
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