const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config() // handling of environment variables
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const user = require('./models/user')

const SECRET = process.env.SECRET

console.log('connecting to DBBD')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
    allGenres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ) : User

    login(
      username: String!
      password: String!
    ) : Token

  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      if (args.author) {
        // graphQL processes promises (.find({})) immediately, no need for .then => 
         return Book.find({ author: args.author }).populate('author')
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }

      const books = await Book.find({}).populate('author')
      console.log(books)
      return books
    
    },
    allAuthors: async () =>  {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    
    allGenres: async () => {
      // author id not needed
      const books = await Book.find({})

      // reduce = (accumulate, currentValue) => ...
      const genres = books.reduce((allGenres, currentBook) => {

        currentBook.genres.forEach(genre => allGenres.add(genre))
        return allGenres
      }, new Set())
      //}, initial value for accumulate = new Set())


      return genres
    }

  },

  Author: {
    bookCount: async (root) => {
      // note: find() returns an object, and filter() an array.
      const author = await Author.findOne({ name: root.name }).select('_id')

      return Book.find({ author: author }).countDocuments()
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError('u shall not pass.')
      }
      
      let author = await Author.findOne({ name: args.author })
      let book
      try {
        if (author) {
          book = new Book({ ...args, author: author._id})
          await book.save()
        } else {

          author = new Author({ name: args.author, born: null, bookCount: 1, id: uuidv4() })
          book = new Book({ ...args, author: author._id})

          await author.save()
          await book.save()
        }

      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args, })
      }

      // need to return something more than null:
      return await Book.findOne({ title: args.title }).populate('author')
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('u shall not pass.')
      }

      const author = await Author.findOne({ name: args.name })

      console.log(author)
      if (!author) return null

      author.born = args.setBornTo

      try {
        author.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args, })
      }

      return author
    },

    createUser: async (root, args) => {
      try {
        const user = new User({...args})
        await user.save()
        return user
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }

    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'boogiewonderland') throw new UserInputError('u shall not pass.')

      const userForToken = { username: user.username, id: user._id,
      }
      
      return { value: jwt.sign(userForToken, SECRET) }
    }


  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET)
  
      console.log('decoded token: ', decodedToken)

      //const currentUser = await User.findById(decodedToken.id)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }

  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
