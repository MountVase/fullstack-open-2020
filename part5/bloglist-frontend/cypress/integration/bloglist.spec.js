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