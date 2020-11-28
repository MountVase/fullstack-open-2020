import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
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

  // played around with order of a, b. now seems to work.
  const sortedByLikes = [...blogs.sort((a, b) => b.likes - a.likes)]


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

      setNotif({ message: `welcome back, ${user.name}.`, type: 'loginSuccess' })
      // after set seconds, setNotif to null again
      setTimeout(() => {
        setNotif(null)
      }, 5000)


    } catch (exception) {
      console.log(exception)
      setNotif({ message: 'wrong username or passss', type: 'loginFailed' })

      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  // handleLogin, username, setUsername, password, setPassword
  if (user === null) {

    const loginform = <div>
      <Notification props={notif}></Notification>
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
      <Notification props={notif}></Notification>
      <h2>blogs</h2>
      <div>{user.name} logged in
        <button onClick={handleLogout}> logout</button>
      </div>

      <h2>create new</h2>
      <Toggle buttonLabel="create new blog">
        <BlogForm>
        </BlogForm>
      </Toggle>

      {sortedByLikes.map(blog =>
        <Blog key={blog.id} initialBlog={blog} user={user}/>

      )}

    </div>
  )
}

export default App