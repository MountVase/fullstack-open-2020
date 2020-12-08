import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggle from './components/Toggle'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogService'
import loginService from './services/loginService'

import { useDispatch, useSelector } from 'react-redux'

import { displayNotification } from './reducers/notificationReducer'
import { initializeDb} from './reducers/blogReducer'

import { setUser } from './reducers/signedInUserReducer'
import { clearUser } from './reducers/signedInUserReducer'

import './index.css'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.signedInUser)

  // played around with order of a, b. now seems to work.
  const sortedByLikes = [...blogs.sort((a, b) => b.likes - a.likes)]


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeDb())
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
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

      dispatch(setUser(user))
      setUsername('')
      setPassword('')

      dispatch(displayNotification({ message: `welcome back, ${user.name}.`, style: 'loginSuccess' }, 5 ))


    } catch (exception) {
      console.log(exception)
      dispatch(displayNotification( { message: 'wrong username or passss', style: 'loginFailed' } , 5 ))

    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    // setUser(null)
    dispatch(clearUser())
    setUsername('')
    setPassword('')
  }

  // handleLogin, username, setUsername, password, setPassword
  if (user === null) {

    const loginform = <div>
      <Notification></Notification>
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
      <Notification></Notification>
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