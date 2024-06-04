// npx cypress open

describe('User Authentication', () => {
  it('logs in with valid credentials', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="authButton"]').should('not.exist');
  });

  it('shows error for no username provided', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'No username was provided for the user');
  });

  it('shows error for no password provided', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'No password was provided for the user');
  });

  it('shows error for invalid username', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Broski');
    cy.get('[data-cy="passwordField"]').type('123');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'The username cannot be found in the database!');
  });

  it('shows error for invalid password', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="passwordField"]').type('123');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'The password is incorrect!');
  });
});

describe('User Registration', () => {
  // it('register with valid credentials', () => {
  //   cy.visit('http://localhost:5000');
  //   cy.get('[data-cy="loginSwitch"]').click();
  //   cy.get('[data-cy="usernameField"]').type('New');
  //   cy.get('[data-cy="passwordField"]').type('haha');
  //   cy.get('[data-cy="authButton"]').click();
  //   cy.get('[data-cy="authButton"]').should('not.exist');
  // });

  it('error for using taken name', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="loginSwitch"]').click();
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="passwordField"]').type('123');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'A user with that username already exists!');
  });

  it('shows error for no username provided', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="loginSwitch"]').click();
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'No username was provided for the user');
  });

  it('shows error for no password provided', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="loginSwitch"]').click();
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="errorMessage"]').should('contain', 'No password was provided for the user');
  });
});

describe('User Permissions', () => {
  it('Admin permissions', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="authButton"]').should('not.exist');

    cy.get('[data-cy="userSwitch"]').should('exist');
  });

  it('Manager permissions', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Manager');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="authButton"]').should('not.exist');

    cy.get('[data-cy="userSwitch"]').should('not.exist');
    cy.get('[data-cy="addButton"]').should('exist');
  });

  it('User permissions', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('User');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();
    cy.get('[data-cy="authButton"]').should('not.exist');

    cy.get('[data-cy="userSwitch"]').should('not.exist');
    cy.get('[data-cy="addButton"]').should('not.exist');
  });
});