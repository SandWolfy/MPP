// npx cypress open

describe('Data Read', () => {
  it('User Item Read', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('User');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();

    cy.wait(6000);

    cy.get('[data-cy="itemName"]').should('contain', 'Michael');
  });

  it('User Buff Read', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('User');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();

    cy.wait(6000);

    cy.get('[data-cy="buffSwitch"]').click();

    cy.get('[data-cy="buffName"]').should('contain', 'Shiny');
  });

  it('Manager Item Read', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Manager');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();

    cy.wait(6000);

    cy.get('[data-cy="itemName"]').should('contain', 'Michael');
    cy.get('[data-cy="itemDeleteButton"]').should('exist');
  });

  it('Manager Buff Read', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Manager');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();

    cy.wait(6000);

    cy.get('[data-cy="buffSwitch"]').click();

    cy.get('[data-cy="buffName"]').should('contain', 'Shiny');
    cy.get('[data-cy="buffDeleteButton"]').should('exist');
  });

  it('Admin Item Read', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();

    cy.wait(6000);

    cy.get('[data-cy="itemName"]').should('contain', 'Michael');
    cy.get('[data-cy="itemDeleteButton"]').should('exist');
    cy.get('[data-cy="userSwitch"]').should('exist');
  });

  it('Admin Buff Read', () => {
    cy.visit('http://localhost:5000');
    cy.get('[data-cy="usernameField"]').type('Admin');
    cy.get('[data-cy="passwordField"]').type('haha');
    cy.get('[data-cy="authButton"]').click();

    cy.wait(6000);

    cy.get('[data-cy="buffSwitch"]').click();

    cy.get('[data-cy="buffName"]').should('contain', 'Shiny');
    cy.get('[data-cy="buffDeleteButton"]').should('exist');
    cy.get('[data-cy="userSwitch"]').should('exist');
  });
});