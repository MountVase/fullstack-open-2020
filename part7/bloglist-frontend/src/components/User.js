import React from 'react'
import { useResource } from '../hooks/useResource'
import { useParams } from 'react-router-dom'

const User = () => {
  const [users, setUsers] = useResource('http://localhost:3001/api/users')
  const id = useParams().id

  const user = users.find(user => user.id === id)


  // initially will render null, when aSYNCHROUNUS hits it will render correctly...
  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <b>added blogs</b>
      {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </div>
  )
}

export default User