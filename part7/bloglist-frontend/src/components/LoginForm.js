import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogService'
import loginService from '../services/loginService'
import { setUser } from '../reducers/signedInUserReducer'
import { displayNotification } from '../reducers/notificationReducer'

import { Input, Page, FinalButton, InnerContainer } from './styles'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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
      setUsername('')
      setPassword('')

    }
  }

  // id parameters added for express testing.
  return (
    <Page>
      <div>
        <form onSubmit={handleLogin}>
          <div>
          username
            <Input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id="usernameInput"
            />
          </div>
          <div>
          password
            <Input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id="passwordInput"
            />
          </div>
          <InnerContainer>
            <FinalButton type="submit" id="loginButton">login</FinalButton>
          </InnerContainer>
        </form>
      </div>
    </Page>
  )
}

export default LoginForm