const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('User tests. 1 user in db', () => {
    
  beforeEach(async () => {
    await User.deleteMany({})
        
    const passwordHash = await bcrypt.hash('default', 10)
    const user = new User({ username: 'default', passwordHash })

    await user.save()
  })

  test('post request to api/users works', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'Dick_Cheney',
      name: 'Mr. Bush',
      password: 'trumpdaddy'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('dummy test', async () => {
    expect(1).toBe(1)
  })

  test('getting the user works', async () => {
    const realUsers = await helper.usersInDb()
    const usernames = realUsers.map(u => u.username)
    expect(usernames).toContain('default')
  })

  test('helper test', async () => {
    const users = await helper.usersInDb()
    const usernames = users.map(u => u.username)
    expect(usernames[0]).toBe('default')
  })
})





afterAll(() => {
  mongoose.connection.close()
})