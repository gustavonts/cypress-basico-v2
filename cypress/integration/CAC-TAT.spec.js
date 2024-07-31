/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste , teste, teste, Teste, teste, teste, teste , teste, teste'
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Guedes')
        cy.get('#email').type('gustavo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Guedes')
        cy.get('#email').type('gustavo@email,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    
    it('campo telefone continua vazio ao preencher valor nao-numérico', function() {
        cy.get('#phone')
        .type('aaaaaaaaaaa')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Guedes')
        cy.get('#email').type('gustavo@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type("Gustavo")
            .should('have.value', 'Gustavo')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type("Guedes")
            .should('have.value', 'Guedes')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type("gustavo@email.com")
            .should('have.value', 'gustavo@email.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12345657')
            .should('have.value', '12345657')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
        
    it('selecione um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('selecione um produto (mentoria) por seu valor', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it.only('selecione um produto (blog) por seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
  })