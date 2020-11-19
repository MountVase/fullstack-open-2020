const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try {
  const SAVEDBLOG = await blog.save()
  response.status(201).json(SAVEDBLOG)
  } catch(exception) {
    response.status(400).end()
  }

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