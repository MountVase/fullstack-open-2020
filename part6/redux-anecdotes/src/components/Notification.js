import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const render = () => {
    if (notification !== '')  {
      return <div style={style}>{notification}</div>
    }
    else {
      return 
    }
  }

  return (
    <div>
      {render()}
    </div>
  )
}

export default Notification