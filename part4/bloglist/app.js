const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')



mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)



if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/tests')
  app.use('/api/test', testRouter)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
