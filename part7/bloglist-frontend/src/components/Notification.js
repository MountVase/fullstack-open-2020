import React from 'react'

const Notification = ({ props }) => {
  // this is added as a component, and constantly checks if it should display a message

  if (props === null) return null

  else return (
    <div className={props.type}>{props.message}</div>
  )
}

export default Notification