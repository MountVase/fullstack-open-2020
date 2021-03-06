import { gql } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
  } 
`

export const LOGIN = gql`
mutation log_in($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query errything($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const ADD_BOOK = gql`
  mutation addBookToWeb($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
      }
      id
      genres
    } 
  }
`

export const UPDATE_AUTHOR_YEAR = gql`
  mutation setYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      bookCount
      id
      born
    }
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`