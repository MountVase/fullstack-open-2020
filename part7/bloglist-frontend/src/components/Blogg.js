import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { likeBlog } from '../reducers/blogReducer'
import { addComment } from '../reducers/blogReducer'

import { AnotherButton, LinkLink, Input } from '../components/styles'


const Blogg = () => {
  const [comment, setComment] = useState('')

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
    borderWidth: 1,
    marginBottom: 5,
  }

  const addCommentToBlog = async (event) => {
    event.preventDefault()

    try {
      dispatch(addComment(id, comment))
      setComment('')
    } catch (exception) {
      console.log(exception)
    }

  }

  const generateId = () => {
    const rand = Math.floor(1000 + Math.random() * 9000)
    return rand
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
        <AnotherButton type="button" onClick={addLike} id="likeButton">like</AnotherButton>
      </div>

      <div>added by <LinkLink to={`/users/${blog.user.id}`}>{blog.user.name}</LinkLink></div>

      <h4>comments</h4>
      <form onSubmit={addCommentToBlog}>
        <Input type="text" value={comment} onChange={event => setComment(event.target.value)}></Input>
        <AnotherButton type="submit">comment</AnotherButton>
      </form>

      {blog.comments.map(comment => <li key={generateId()}>{comment}</li>)}
    </div>
  )
}

export default Blogg