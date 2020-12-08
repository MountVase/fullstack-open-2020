import React from 'react'


const LoginForm = ({ onSubmit, username, setUsername, password, setPassword }) => {

  // id parameters added for express testing.

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="usernameInput"
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="passwordInput"
          />
        </div>
        <button type="submit" id="loginButton">login</button>
      </form>
    </div>
  )
}

export default LoginForm