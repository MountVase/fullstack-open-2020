const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  // if authorization field exists in HTTP request and starts with 'bearer '
  // then return everything but the first 7 characters
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  
  const body = request.body
  // by putting request in the parameters of getTokenFrom, we essentially pass on the responsibility, cool
  const token = getTokenFrom(request)
  
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid (loginstuff)' })
  }

  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    id: body.id,
    user: user._id
  })
  
  
/*
  usersRouter.get('/', async () => {
    const users = await User.find({})
    response.json(users)
})
*/
  


  const SAVEDBLOG = await blog.save()
  user.blogs = user.blogs.concat(SAVEDBLOG._id)
  await user.save()
  response.status(201).json(SAVEDBLOG)
  
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end() //response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
    // need everything to update, or just the value that differs?
  const newLikes = {
    likes: request.body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, newLikes, { new: true})
  })

/*

  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
*/

  module.exports = blogsRouter