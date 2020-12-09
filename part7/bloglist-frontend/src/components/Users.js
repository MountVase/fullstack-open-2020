import React from 'react'
import { useResource } from '../hooks/useResource'
import { Link } from 'react-router-dom'


const Users = () => {
  const [users, setUsers] = useResource('http://localhost:3001/api/users')
  console.log(users)

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