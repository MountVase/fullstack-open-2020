import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  //const [getMe, meResult] = useLazyQuery(ME)
  //const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS)
  
  const meResult = useQuery(ME)
  
  let favGenre

  if (meResult.data) {
    favGenre = meResult.data.me?.favoriteGenre
  } else {
    favGenre = null
  }
  
  const books = useQuery(ALL_BOOKS, { variables : { genre: favGenre } })


  if (!props.show) {
    return null
  }

  

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favGenre}</b></p>

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
          {books.data.allBooks.map(a =>
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

export default Recommended