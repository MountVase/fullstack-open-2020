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

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import { setUser } from './reducers/signedInUserReducer'
import { clearUser } from './reducers/signedInUserReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'


import { Page, Navigation, LogoutButton , LinkLink} from './components/styles'
import styled from 'styled-components'

import './index.css'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.signedInUser)

  // played around with order of a, b. now seems to work.
  const sortedByLikes = [...blogs.sort((a, b) => b.likes - a.likes)]


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  const StyledLink = styled(Link)`
    padding: 0.25em 2em;
    font-size: 1.12em;
    color: #241D15;
    background: #FF1E00;
    margin-bottom: 2em;

  `

  const Header = () => {
    return (
      <Navigation>
        <div>
          <Notification></Notification>
          <h2>blogs</h2>
          <div>
            <StyledLink to="/">blogs</StyledLink>
            <StyledLink to="/users">users</StyledLink>
          </div>

          <div style={ { paddingTop: '15px' } }>{user.name} logged in
            <LogoutButton onClick={handleLogout}> logout</LogoutButton>
          </div>
        </div>
      </Navigation>
    )
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
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
          <div key={blog.id} style={blogStyle}><LinkLink to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</LinkLink></div>
        )}

      </div>
    )
  }

  return (

    <Router>
      <Switch>
        <Route path="/users/:id">
          <Header></Header>
          <Page>
            <User></User>
          </Page>
        </Route>
        <Route path="/users">
          <Header></Header>
          <Page>
            <Users></Users>
          </Page>
        </Route>
        <Route path="/blogs/:id">
          <Header></Header>
          <Page>
            <Blogg></Blogg>
          </Page>
        </Route>
        <Route path="/">
          <Header></Header>
          <Page>
            <Home></Home>
          </Page>
        </Route>
      </Switch>
    </Router>
    
  )
}

export default App