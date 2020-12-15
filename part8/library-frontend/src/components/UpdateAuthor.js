
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, UPDATE_AUTHOR_YEAR } from '../queries'

const UpdateAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ updateYear ] = useMutation(UPDATE_AUTHOR_YEAR, { refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS} ]})
  const result = useQuery(ALL_AUTHORS)


  const updateBoii = (event) => {
    event.preventDefault()

    updateYear({ variables: {name, born: Number(born) } })
    setName('')
    setBorn('')
  }


  return (
    <div>
    <h2>set birthyear</h2>

    <form onSubmit={updateBoii}>
      <div>
        <select onChange={event => setName(event.target.value)}>

           {result.data.allAuthors.map(a => 
              <option key={a.name} value={a.name} >{a.name}</option>
            )}
            
          </select>
      </div>
      <div>born: <input type="text" value={born} onChange={event => setBorn(event.target.value)}></input></div>
      <div><button type="submit"> update author</button></div>
    </form>
    </div>
  )


}

export default UpdateAuthor