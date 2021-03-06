import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { displayNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import { BCreateButton } from '../components/styles'

const BlogForm = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreation = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,

    }

    try {

      dispatch(createBlog( blog ))
      dispatch(displayNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, style: 'loginSuccess' } , 5 ))


    } catch (exception) {
      console.log(exception)
    }


    setTitle('')
    setAuthor('')
    setUrl('')
  }


  // add id:s to inputs for cypress testing
  return (
    <div>
      <form onSubmit={handleCreation}>
        <div>
        title
          <input
            type="text"
            value={title}
            name="title: "
            onChange={({ target }) => setTitle(target.value)}
            id="titleInput"
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="author: "
            onChange={({ target }) => setAuthor(target.value)}
            id="authorInput"
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            name="url: "
            onChange={({ target }) => setUrl(target.value)}
            id="urlInput"
          ></input>
        </div>
        <div>
          <BCreateButton type="submit" id="createButton">create</BCreateButton>
        </div>
      </form>
    </div>
  )
}

export default BlogForm