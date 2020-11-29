describe('Bloglist tests:', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    const user = {
      name: 'BREAL',
      username: 'cypresshill',
      password: 'smokethatshit'
    }
    // create new user to test with
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is visible:', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })


})