import React, { useEffect } from 'react'

import Notification from './components/Notification'
import Toggle from './components/Toggle'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import Blogg from './components/Blogg'

import blogService from './services/blogService'
import { useDispatch, useSelector } from 'react-redux'

import { initializeDb} from './reducers/blogReducer'

import { setUser } from './reducers/signedInUserReducer'
import { clearUser } from './reducers/signedInUserReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useHistory
} from 'react-router-dom'


import './index.css'


const App = () => {
  const blogs = useSelector(state => state.blogs)
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


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    // setUser(null)
    dispatch(clearUser())
  }

  // handleLogin, username, setUsername, password, setPassword
  if (user === null) {

    const loginform = <div>
      <Notification></Notification>
      <LoginForm></LoginForm>
    </div>
    return (
      loginform
    )
  }
  const padding = {
    paddingRight: 5
  }

  const Header = () => {
    return (
      <div>
        <Notification></Notification>
        <h2>blogs</h2>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>

        <div>{user.name} logged in
          <button onClick={handleLogout}> logout</button>
        </div>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid #0dcfcf',
    borderWidth: 1,
    marginBottom: 5,
  }

  const Home = () => {
    return (
      <div>
        <h2>create new</h2>
        <Toggle buttonLabel="create new blog">
          <BlogForm>
          </BlogForm>
        </Toggle>

        {sortedByLikes.map(blog =>
          <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></div>
        )}

      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/users/:id">
          <Header></Header>
          <User></User>
        </Route>
        <Route path="/users">
          <Header></Header>
          <Users></Users>
        </Route>
        <Route path="/blogs/:id">
          <Header></Header>
          <Blogg></Blogg>
        </Route>
        <Route path="/">
          <Header></Header>
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  )
}

export default App