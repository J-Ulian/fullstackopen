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
      cy.login({ username: 'j-j', password: 'reallystrongpassword' });
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
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'cypress',
          url: 'localcypress',
        });
        cy.createBlog({
          title: 'a second blog created by cypress',
          author: 'cypress',
          url: 'localcypress',
        });
        cy.createBlog({
          title: 'a third blog created by cypress',
          author: 'cypress',
          url: 'localcypress',
        });
      });

      it.only('you can like it', function () {
        cy.contains('second').contains('view').click();
        cy.contains('second').contains('like this post').click();
        cy.contains('1');
      });
    });
  });
  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error').contains('wrong credentials');
    cy.get('.error')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });
});
