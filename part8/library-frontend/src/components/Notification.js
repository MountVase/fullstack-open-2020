import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (!message) return null
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>{message}</div>
  )

}

export default Notification
