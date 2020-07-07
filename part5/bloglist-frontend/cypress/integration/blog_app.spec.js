describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'admin',
      username: 'j-j',
      password: 'reallystrongpassword',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('blogs');
  });

  it('user can log in', function () {
    cy.contains('login').click();
    cy.get('#username').type('j-j');
    cy.get('#password').type('reallystrongpassword');
    cy.get('#login-button').click();
    cy.contains('admin logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('j-j');
      cy.get('#password').type('reallystrongpassword');
      cy.get('#login-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('localcypress');
      cy.contains('save').click();
      cy.contains('a blog created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click();
        cy.get('#title').type('a blog created by cypress');
        cy.get('#author').type('cypress');
        cy.get('#url').type('localcypress');
        cy.contains('save').click();
      });

      it('you can like it', function () {
        cy.contains('view').click();
        cy.contains('like this post').click();
        cy.contains('1');
      });
    });
  });
});
