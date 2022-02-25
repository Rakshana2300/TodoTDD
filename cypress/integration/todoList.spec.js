describe('Todo List Display',() => {
    it('Loads todo items on the page', () => {
        cy.seedAndVisit()
        cy.get('.show-all').click()
        cy.get('.todo-list p').should('have.length', 3)
    })
})

describe('Displaying active tasks', () => {
    it('Loads active items', () => {
        cy.seedAndVisit()
        cy.get('.show-active').click().click()
        cy.route({
            url: '/todos',
            method: 'GET',
            status: 200
        })
        cy.get('.todo-list p').should('have.length', 2)
    })
    it('Shows the number of active tasks', () => {
        cy.get('.todo-count').should('contain', 2)
    })   
})

describe('Displaying completed items', () => {
    
    it('Loads the completed items', () => {
        cy.seedAndVisit()
        cy.get('.show-completed').click().click()
        cy.get('.todo-list p').should('have.length', 1)
    })
    
    it('Shows the number of completed tasks', () => {
        cy.get('.todo-count').should('contain', 1)
    })

    it('Updates todo when submitted', () => {
        cy.seedAndVisit()
        cy.get('.show-all').click()
        cy.route('PUT','/todos',{
            id: 1,
            description: 'Learn about Cypress!!!',
            completed: false
        })
        cy.get('.todo-list p')
        cy.get('.edit').first().click()
        cy.get('.edit-todo').first().type('!!!')
        cy.get('.edit-submit').first().click().should('have.value', '')
        cy.get('.todo-list p').should('have.length', 3).and('contain', 'Learn about Cypress!!!')
        
    })
    
    it('Removes a todo', () => {
        cy.seedAndVisit()
        cy.route({
            url: '/todos/1',
            method: 'DELETE',
            status: 200,
            response: {}
        })
        cy.get('.show-all').click()
        cy.get('.todo-list p')
        cy.get('.delete').first().click()
    })
})