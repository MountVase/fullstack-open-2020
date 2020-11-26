import React, { useState } from 'react'
import blogService from '../services/blogService'
import Notification from './Notification'

const BlogForm = () => {
    
    const [notif, setNotif] = useState(null)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreation = async (event) => {
        event.preventDefault()
    
        const blog = {
          title: title,
          author: author,
          url: url,
        
        }
    
        try {
    
          const response = await blogService.create(blog)
          console.log('HandleCreation response: ', response)
          setNotif({message: `a new blog ${blog.title} by ${blog.author} added`, type: 'loginSuccess'})
          setTimeout(() => {
            setNotif(null)
          }, 5000)
    
        } catch (exception) {
          console.log(exception)
        }
        
    
        setTitle('')
        setAuthor('')
        setUrl('')
      }


    return (
        <div>
        <Notification props={notif}></Notification>
        <form onSubmit={handleCreation}>
        <div>
        title
            <input
            type="text"
            value={title}
            name="title: "
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
        author: 
            <input
            type="text"
            value={author}
            name="author: "
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
        url
            <input
            type="text"
            value={url}
            name="url: "
            onChange={({ target }) => setUrl(target.value)}       
            ></input>
            </div>
        <div>
        <button type="submit">create</button>
        </div>
    </form>
    </div>
    )    
}

export default BlogForm