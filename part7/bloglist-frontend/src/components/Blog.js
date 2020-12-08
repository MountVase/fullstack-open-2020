import React, { useState } from 'react'
import blogService from '../services/blogService'

import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'


const Blog = ({ initialBlog, user }) => {

  const [showAll, setShowAll] = useState(false)
  const [blog, setBlog] = useState(initialBlog)


  const dispatch = useDispatch()
  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const addLike = async () => {
    // add a like to state, then update blog in backend
    // actually try updating the thing first, then set state

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

    const response = await blogService.update(blog.id, newBlog)
    console.log('logging some SHIIET:', response)
    setBlog(newBlog)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid #0dcfcf',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlog = (event) => {
    event.preventDefault()

    const bool = window.confirm(`Remove blog "${blog.title} by ${blog.author}?"`)

    if (bool) {

      try {
        // await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
        console.log('deleting successful')

      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const buttonVisibility = () => {

    if (blog.user.username.toString() === user.username.toString()) {
      return (
        <div className="button">
          <button type="button" onClick={deleteBlog} id="removeBlogButton">remove</button>
        </div>
      )
    } else {
      return null
    }
  }


  if (!showAll) {
    return (
      <div style={blogStyle} className="previewBlog">
        {blog.title} by {blog.author}
        <button type="button" onClick={toggleVisibility} id="viewButton">view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="completeBlog">
      <div>
        {blog.title} by {blog.author}
        <button type="button" onClick={toggleVisibility}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div className="likes" id="likeAmount">
        {blog.likes}
        <button type="button" onClick={addLike} id="likeButton">like</button>
      </div>

      <div>{blog.user.name}</div>

      <div>{buttonVisibility()}</div>
    </div>
  )
}

export default Blog