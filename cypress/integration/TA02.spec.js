/* eslint-disable no-undef */
describe("TA2 sistemos naudotojo registracija prie sistemos", () => {

    it('atidaromas registracijos tinklapis', () => {
        cy.visit('/');
        cy.get('.ml-auto > .fa').click();
        cy.contains('Registruotis').click();
    });
    it('užpildomi registracijos duomenys', () => {
        cy.get('#usernameField').type(Cypress.env('user'));
        cy.get('#emailField').type('Naudotojas1@gmail.com');
        cy.get('#passwordField').type(Cypress.env('pass'));
        cy.get('#confirmPasswordField').type(Cypress.env('pass'));
        cy.get('.btn').click();
    });
    it("naudotojas nukreipiamas į pagrindinį tinklapį", () => {
        cy.url().should('eq', 'http://localhost:3000/')
    })
    it("naudotojas yra prisijungęs", () => {
        cy.get('span').contains(Cypress.env('user'))
    })

})