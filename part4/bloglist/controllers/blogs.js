const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  usersRouter.get('/', async () => {{
    const users = await User.find({})
    response.json(users)
}})
  const SAVEDBLOG = await blog.save()
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