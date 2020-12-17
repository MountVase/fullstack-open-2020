const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config() // handling of environment variables
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const SECRET = process.env.SECRET

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


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

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
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


  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
