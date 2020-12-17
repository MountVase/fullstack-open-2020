
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()


  const handleLogout = (event) => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? (<><button onClick={() => setPage('recommended')}>recommended</button>
                  <button onClick={() => setPage('add')}>add book</button>
                  <button onClick={handleLogout}>logout</button></>) 
          : (<button onClick={() => setPage('login')}>login</button>)}

        
      </div>

      
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App