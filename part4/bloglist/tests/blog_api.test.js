const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('../utils/test_helper')

const api = supertest(app)

// test fodder
const Blog = require('../models/blog')
const User = require('../models/user')



//deletes everything and saves 2 first blogs to mongo
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsToObjects = helper.testBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsToObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Non-token tests: ', () => {

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

})
  // härifrån neråt broken 

describe('authentication-involved tests: ', () => {
  let token = null

  // logging in before doing any of the tests, 
  // describe blocks useful bcz of this
  beforeAll(async () => {

    // clearing database, creating a testing user, and then logging in
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('tester', 10)
    const user = new User({ username: 'tester', passwordHash })

    await user.save()


    const response = await api
      .post('/api/login')
      .send({ username: 'tester', password: 'tester'})
      

    token = response.body.token
  })

  test('posting w/ http a blog is [im]possible when not logged in', async () => {
    const blog = {
      title: 'anotherone',
      author: 'dickimus',
      url: 'https://www.britannica.com/biography/Marcus-Aurelius-Roman-emperor'
    }
    
    await api.post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    
      
    const ass = token
    // obs! blogsInDb() is a function.. not an array or something else from test helper
    const allblogs = await helper.blogsInDb()

    expect(allblogs).toHaveLength(helper.testBlogs.length)
    

  })

  test('posting is possible when logged in with valid token' , async () => {
    const blog = {
      title: 'Attachment is the enemy of love.',
      author: 'loveDoctor',
      url: 'https://grahamhancock.com/galleries/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

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
    
    // check if no blogs have been added.

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.testBlogs.length)
  
  })

})

describe('specific :id operations', () => {
  test('getting a specific :id', async () => {
    const idOfSecondBlog = '5faaa9040a09973f6af10e43'

    await api.get(`/api/blogs/${idOfSecondBlog}`)
      .expect(200)
    // console.log(response)
    // expect(response.body.title).toBe(helper.testBlogs[1].title)

  })

  // TODO
  // deleting test?? 

})



afterAll(() => {
  mongoose.connection.close()
})

