const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')

const api = supertest(app)

// test fodder
const Blog = require('../models/blog')




//deletes everything and saves 2 first blogs to mongo
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsToObjects = helper.testBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsToObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('API tests: ', () => {

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  })

  test('returns correct amount of blogs w/ testBlogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.testBlogs.length)
  })


  test('.id property of a blog exists', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    // toBeDefined exactly like blogsInDb()
    expect(blog.id).toBeDefined()
  })

  test('posting w/ http a blog is possible', async () => {
    const blog = {
      title: 'anotherone',
      author: 'dickimus',
    }
    
    await api.post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    // obs! blogsInDb() is a function.. not an array or something else from test helper
    const allblogs = await helper.blogsInDb()

    expect(allblogs).toHaveLength(helper.testBlogs.length+1)
    //TODO 
    // content check
  })



})


afterAll(() => {
  mongoose.connection.close()
})

