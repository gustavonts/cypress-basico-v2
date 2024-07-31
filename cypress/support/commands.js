Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Guedes')
    cy.get('#email').type('gustavo@email.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})