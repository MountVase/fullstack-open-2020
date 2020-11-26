import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [showAll, setShowAll] = useState(false)  

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid #0dcfcf',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} by {blog.author}
        <button type="button" onClick={toggleVisibility}>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} onClick={toggleVisibility}>
      <div>
        {blog.title} by {blog.author}
        <button type="button" onClick={toggleVisibility}>hide</button>
      </div>
      <div>{blog.url}</div>
    <div>
      {blog.likes}
      <button type="button">like</button>
    </div>
    <div>{blog.user.name}</div>
  </div>
  )
}

export default Blog