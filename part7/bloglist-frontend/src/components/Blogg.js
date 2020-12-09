import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'


const Blogg = () => {
  const blogs= useSelector(state => state.blogs)
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)

  const dispatch = useDispatch()


  const addLike = async () => {

    const newLikes = blog.likes + 1

    // new blogs user (id only) is fetched from the current blog.

    // FUCKME ID WAS MISSING THATS WHY IT LIKED ONLY ONE TIME:.........
    const newBlog = {
      id: blog.id,
      user: blog.user,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    dispatch(likeBlog(newBlog.id, newBlog))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid #0dcfcf',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) {
    return null
  }

  return (

    <div style={blogStyle} className="completeBlog">
      <b>
        {blog.title} by {blog.author}
      </b>
      <div>{blog.url}</div>
      <div className="likes" id="likeAmount">
        {blog.likes}
        <button type="button" onClick={addLike} id="likeButton">like</button>
      </div>

      <div>added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></div>

      <h4>comments</h4>
      {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
    </div>
  )
}

export default Blogg