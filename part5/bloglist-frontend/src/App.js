import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/loginService'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  // handleLogin, username, setUsername, password, setPassword
  if (user === null) {
    const temp = <div><p>ass</p></div>
    const t = <div><p>titties</p></div>

    const loginform = <LoginForm
                      onSubmit={handleLogin}
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                    ></LoginForm>

    return (
      loginform
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App