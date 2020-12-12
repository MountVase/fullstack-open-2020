import React from 'react'
import { useSelector } from 'react-redux'
import { LinkLink } from '../components/styles'


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
          {users.map(user => <li key={user.id}><LinkLink to={`/users/${user.id}`}>{user.name}</LinkLink> {user.blogs.length}</li>)}
        </div>


      </div>

    </div>
  )
}

export default Users