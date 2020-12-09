import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.users)


  if (!users) {
    return null
  }

  return (
    <div>
      <h2>users</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: 0 }}>
        <div className="column">
          <b>name {'      '} blogs posted</b>
          {users.map(user => <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}</li>)}
        </div>


      </div>

    </div>
  )
}

export default Users