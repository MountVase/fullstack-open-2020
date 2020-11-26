import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={blogStyle}>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}</div>
        <div>{blog.author}</div>
     </div>
  )
}

export default Blog