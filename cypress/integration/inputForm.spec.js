describe('Input form', () => {
    beforeEach(() => {
        cy.seedAndVisit([])
        cy.get('.show-all').click()
    })
    it('accepts input', () => {
        
        cy.get('.new-todo').type('Learn about Cypress').should('have.value', 'Learn about Cypress')        
    })
    context('Form submission', () => {
        it('Adds a new todo when submitted', () => {
            cy.server()
            cy.route('POST','/todos',{
                id: 1,
                description: 'Learn about Cypress',
                completed: false
            })
            cy.get('.new-todo').type('Learn about Cypress')
            cy.get('.add-todo').click().should('have.value', '')

            cy.get('.todo-list p').should('have.length', 1).and('contain', 'Learn about Cypress')
            
        })
    })
    
})