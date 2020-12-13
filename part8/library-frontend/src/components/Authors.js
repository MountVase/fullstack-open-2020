  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, UPDATE_AUTHOR_YEAR } from '../queries'

const Authors = (props) => {
  const [ updateYear ] = useMutation(UPDATE_AUTHOR_YEAR, { refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS} ]})

  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')


  const updateBoii = (event) => {
    event.preventDefault()

    updateYear({ variables: {name, born: Number(born) } })
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (<div>loading...</div>)
  }

  return (
    <div>
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={updateBoii}>
        <div>name: <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input></div>
        <div>born: <input type="text" value={born} onChange={event => setBorn(event.target.value)}></input></div>
        <div><button type="submit"> update author</button></div>
      </form>
      </div>
   </div>
  
    
  )
}

export default Authors
