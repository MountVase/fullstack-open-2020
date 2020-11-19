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
      url: 'https://www.britannica.com/biography/Marcus-Aurelius-Roman-emperor'
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

  test('if likes property of blog is missing, default should be 0', async () => {
    const blog = {
      title: 'Blog that no one likes',
      author: 'Person that no one likes',
      url: 'https://www.dea.gov/'
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const allLikes = allBlogs.map(blog => blog.likes)


    const lastblog = allLikes[allLikes.length - 1]

    expect(lastblog).toBe(0)

  })


  test('if title & likes property is missing, backend responds with status code 400', async () => {
    const blog = {
      author: 'spammer',
      likes: 10000
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(400)
    
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.testBlogs.length)
    
  })



})


afterAll(() => {
  mongoose.connection.close()
})

