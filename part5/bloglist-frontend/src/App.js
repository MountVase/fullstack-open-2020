import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notifcation from './components/Notification'
import Toggle from './components/Toggle'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogService'
import loginService from './services/loginService'

import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notif, setNotif] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    } 
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log('handleLogin setting of token: ', user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')

      setNotif({message: `welcome back, ${user.name}.`, type: 'loginSuccess'})
      // after set seconds, setNotif to null again
      setTimeout(() => {
        setNotif(null)
      }, 5000)


    } catch (exception) {
      console.log(exception)
      setNotif({message: `wrong username or passss`, type: 'loginFailed'})

      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  // handleLogin, username, setUsername, password, setPassword
  if (user === null) {
    const temp = <div><p>ass</p></div>
    const t = <div><p>titties</p></div>

    const loginform = <div>
                      <Notifcation props={notif}></Notifcation>
                      <LoginForm
                      onSubmit={handleLogin}
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                      ></LoginForm>
                      </div>
    return (
      loginform
    )
  }
  
  return (
    <div>
      <Notifcation props={notif}></Notifcation>
      <h2>blogs</h2>
      <div>{user.name} logged in
      <button onClick={handleLogout}> logout</button>
      </div>

      <h2>create new</h2>
      <Toggle buttonLabel="create new blog">
      <BlogForm>
      </BlogForm>
      </Toggle>

      {blogs.map(blog =>
      
        
        <Blog key={blog.id} blog={blog} />
        
      )}

      </div>
  )
}

export default App