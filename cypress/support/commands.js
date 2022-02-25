Cypress.Commands.add('seedAndVisit', (data = 'fixture:todos') => {
    cy.server();
    cy.route('GET','/todos', data)
    cy.visit('http://localhost:3001')
})