import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
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
      {user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
    </div>
  )
}

export default User