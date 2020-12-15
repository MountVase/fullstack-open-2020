import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

// components needed elsewhere passed in as Probbps
const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  

  // , { onError: e => props.setError(e.graphQLErrors[0].message) }
  const [login, result] = useMutation(LOGIN)

  // useEffect to handle logging in and passing token to App.js state
  useEffect(() => {
    if (result.data) {
      // compare  = result.data.allBlogs.title
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('loggedInUserToken', token)

    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

}

export default LoginForm