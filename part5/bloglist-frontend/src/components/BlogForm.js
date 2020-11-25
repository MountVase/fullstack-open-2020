import React from 'react'

const BlogForm = ({ onSubmit, title, setTitle, author, setAuthor, url, setUrl }) => {
    
    
    return (
        <form onSubmit={onSubmit}>
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
    )    
}

export default BlogForm