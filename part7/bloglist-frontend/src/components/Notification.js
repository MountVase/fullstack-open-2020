import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  // state currently only has notifications, refactor needed later
  const notification = useSelector(state => state)


  if (notification === null) return null


  else return (
    <div className={notification.style}>{notification.message}</div>
  )
}

export default Notification