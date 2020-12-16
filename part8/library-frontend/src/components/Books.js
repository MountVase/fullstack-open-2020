import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')

  const genres = useQuery(ALL_GENRES)

  // changing allbooks query to lazy. We can automate fetching with useEffect, but then also dispatch specific parameter
  // queries in conditional button event handlers :DD
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  // page works without this useEffect, but if someone adds a book, this fetches the books again :)
  useEffect(() => {
    getBooks()
  }, [getBooks])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }


  const handleGenre = (e) => {
    const genre = e.target.value

    if (genre === "all genres") {
      getBooks()
      setGenre(genre)
    } else {

    getBooks({ variables: { genre: genre } })
    setGenre(genre)
    console.log(result.data.allBooks)
    }
  }
  
  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{genre}</b></p>
      <button key="mainButton" onClick={handleGenre} value="all genres"><b>all genres</b></button>
      {genres.data.allGenres.map(g => <button key={g} onClick={handleGenre} value={g}>{g}</button>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books