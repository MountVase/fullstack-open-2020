import React, { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, user }) => {

  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const addLike = async () => {
    // add a like to state, then update blog in backend
    // actually try updating the thing first, then set state

    const newLikes = blog.likes + 1

    const newBlog = {
      user: blog.user._id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const response = await blogService.update(blog.id, newBlog)
    setLikes(response.likes)

  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid #0dcfcf',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlog = async (event) => {
    event.preventDefault()

    const bool = window.confirm(`Remove blog "${blog.title} by ${blog.author}?"`)

    if (bool) {

      try {
        await blogService.remove(blog.id)
        console.log('deleting successful')

      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const buttonVisibility = () => {
    if (blog.user.name.toString() === user.name.toString()) {
      return (
        <div className="button">
          <button type="button" onClick={deleteBlog}>remove</button>
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
        <button type="button" onClick={toggleVisibility}>view</button>
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
      <div>
        {likes}
        <button type="button" onClick={addLike}>like</button>
      </div>

      <div>{blog.user.name}</div>

      <div>{buttonVisibility()}</div>
    </div>
  )
}

export default Blog