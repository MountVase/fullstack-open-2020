import React from 'react'
import { useResource } from '../hooks/useResource'


const Users = () => {
  const [users, setUsers] = useResource('http://localhost:3001/api/users')



  return (
    <div>
      <h2>users</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: 0 }}>
        <div className="column">
          <b>name {'      '} blogs posted</b>
          {users.map(user => <div key={user.id}>{user.name} {'   '}  {user.blogs.length}</div>)}
        </div>


      </div>

    </div>
  )
}

export default Users