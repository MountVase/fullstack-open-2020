const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('User tests. One user in db', () => {
    
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('supersecret', 10)
        let user = new User(helper.testUsers[0])
        await user.save()
        user = new User(helper.testUsers[1])
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

    test('getting users works', async () => {
        const realUsers = await helper.usersInDb()
        const users = await api.get('/api/users')
        expect(users.length).toBe(realUsers.length)
    })
})





afterAll(() => {
    mongoose.connection.close()
  })