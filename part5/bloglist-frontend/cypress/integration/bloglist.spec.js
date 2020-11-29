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