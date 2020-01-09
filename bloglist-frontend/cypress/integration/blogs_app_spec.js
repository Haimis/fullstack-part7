
/* eslint-disable */

beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
        name: 'Tiina',
        username: 'kayttaja',
        password: 'kayttaja'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
})

describe('Login ', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in to application')
    })

    it('login ok when right credentials', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username')
        .type('kayttaja')
        cy.get('#password')
        .type('kayttaja')
        cy.contains('login')
          .click()
        cy.contains('blogs')
    })

    it('login rejected and notification when wrong credentials', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username')
        .type('admiini')
        cy.get('#password')
        .type('admin')
        cy.contains('login')
          .click()
        cy.contains('Login failed, bad username or password')
    })

    it('logout works', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username')
        .type('kayttaja')
        cy.get('#password')
        .type('kayttaja')
        cy.contains('login')
          .click()
        cy.contains('log out')
          .click()
        cy.contains('log in to application')
    })

})

describe('blogs', function() {
    it('new blog is created and opened', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username')
        .type('kayttaja')
        cy.get('#password')
        .type('kayttaja')
        cy.contains('login')
          .click()
        cy.contains('create')
          .click()
        cy.get('#title')
          .type('Uusi blog')
        cy.get('#author')
          .type('kayttaja')
        cy.get('#url')
          .type('bloggaus.fi')
        cy.get('form')
          .submit()
        cy.reload()
        cy.contains('Uusi blog')
         .click()

    })

    it('like works', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username')
        .type('kayttaja')
        cy.get('#password')
        .type('kayttaja')
        cy.contains('login')
          .click()
        cy.contains('create')
          .click()
        cy.get('#title')
          .type('Uusi blog')
        cy.get('#author')
          .type('kayttaja')
        cy.get('#url')
          .type('bloggaus.fi')
        cy.get('form')
          .submit()
        cy.reload()
        cy.contains('Uusi blog')
         .click()
        cy.get('#like')
          .click()
        cy.contains('1 likes')
    })

    it ('comment works', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username')
        .type('kayttaja')
        cy.get('#password')
        .type('kayttaja')
        cy.contains('login')
          .click()
        cy.contains('create')
          .click()
        cy.get('#title')
          .type('Uusi blog')
        cy.get('#author')
          .type('kayttaja')
        cy.get('#url')
          .type('bloggaus.fi')
        cy.get('form')
          .submit()
        cy.reload()
        cy.contains('Uusi blog')
         .click()
        cy.get('input')
          .type('jeejee')
        cy.get('form')
          .submit()
        cy.wait(5500)
        cy.contains('jeejee')
    })
})
