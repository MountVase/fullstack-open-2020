describe('initial tests:', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    cy.visit('http://localhost:3000')
  })

  it('Login form is visible:', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
})

describe('login tests:', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    const user = {
      name: 'BREAL',
      username: 'cypresshill',
      password: 'braindamage'
    }
    // create new user to test with
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login succeeds with correct credentials: ', function () {
    cy.get('#usernameInput').type('cypresshill')
    cy.get('#passwordInput').type('braindamage')
    cy.get('#loginButton').click()

    cy.contains('blogs')
    cy.contains('BREAL logged in')
  })

  it('Login fails with incorrect credentials: ', function () {
    cy.get('#usernameInput').type('cypresshill')
    cy.get('#passwordInput').type('RADIOHEAD')
    cy.get('#loginButton').click()

    cy.contains('wrong username or ')
  })
})

describe('Logged-in functionality: ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    const user = {
      name: 'BREAL',
      username: 'cypresshill',
      password: 'braindamage'
    }
    // create new user to test with
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')

    cy.get('#usernameInput').type('cypresshill')
    cy.get('#passwordInput').type('braindamage')
    cy.get('#loginButton').click()

  })

  it('Blog can be created.', function () {
    cy.get('#expandButton').click()

    cy.get('#titleInput').type('COOM some more.')
    cy.get('#authorInput').type('ContentCreator (CC)')
    cy.get('#urlInput').type('miniclip.com')

    cy.get('#createButton').click()

    // TODO(kinda): make a request to backend to see if it's actually there.
    cy.contains('COOM some more. by ContentCreator (CC) added')

    // not possible, different origin... cy.visit('http://localhost:3001/api/blogs')
    cy.request('GET', 'http://localhost:3001/api/blogs').then(response => {
      console.log(response.body)
    })

  })

})

describe('liking blogs & deleting them: ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    const user = {
      name: 'BREAL',
      username: 'cypresshill',
      password: 'braindamage'
    }
    // create new user to test with
    cy.request('POST', 'http://localhost:3001/api/users', user)

    // login request to that user
    // have to use command.js for some reason, token is null otherwise.
    cy.login(user)

    const blogUno = {
      title: 'Denzel Washing',
      author: 'Lenovo',
      url: 'vulfpeck.io'
    }

    cy.createBlog(blogUno)
    cy.visit('http://localhost:3000')
  })

  it('user can like a damn bLog outthere; ', function () {
    cy.get('#viewButton').click()

    cy.get('#likeAmount').should('contain', 0)

    cy.get('#likeButton').click()
    cy.get('#likeAmount').should('contain', 1)


  })

  it('appropriate user can remove a blog ', function () {
    cy.get('#viewButton').click()
    cy.get('#removeBlogButton').click()
    cy.on('window:confirm', () => true)

    cy.visit('http://localhost:3000')
    cy.contains('Denzel Washing').should('not.exist')
  } )

})