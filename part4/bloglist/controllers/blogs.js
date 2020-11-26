const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id || !decodedToken) {
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
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid (loginstuff)' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(201).end()
  } else {
    response.status(401).json({ error: 'cant just delete someone elses blog bro. Not cool bro.'})
  }

  //response.status(204).end() //response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  // need everything to update, or just the value that differs?
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true } )

  if (updatedBlog) {
    return response.status(200).json(updatedBlog)

  } else {
    return response.status(400).end()
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