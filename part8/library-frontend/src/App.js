
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { BOOK_ADDED, ALL_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notif, setNotif] = useState(null)


  const client = useApolloClient()

  // useEffect to keep users logged in after refresh.
  useEffect(() => {
    const token = localStorage.getItem('loggedInUserToken')
    if (token) {
      // could use `bearer, but that doesn't really matter at this point`
      setToken(token)
    }
  }, [])


  const updateCacheWith = (addedBook) => {
    // method for checking if an object is included in a set
    const includedIn = (set, object) => set.map(book => book.id).includes(object.id)

    // check all books in store? Cache.
    const dataInAether = client.readQuery({ query: ALL_BOOKS })
    
    // if added book not present in cache, append it to cache.
    if (!includedIn(dataInAether.allBooks, addedBook)) {
      client.writeQuery({ query: ALL_BOOKS, data: { allBooks: dataInAether.allBooks.concat(addedBook) } })
    }
  }

  // todo? add authors subscription aswell.
  useSubscription(BOOK_ADDED, { onSubscriptionData: ({ subscriptionData }) => {
    const addedBook = subscriptionData.data?.bookAdded
    setNotif(`ǹew book ${addedBook.title} added`)
    setTimeout(() => {
      setNotif(null)
    }, 5000)
    updateCacheWith(addedBook)


  } })

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

      <Notification message={notif}></Notification>

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