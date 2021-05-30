/* eslint-disable no-undef */
describe("TA3 sistemos naudotojo prisijungimas prie sistemos", () => {

    it('atidaromas prisijungimo tinklapis', () => {
        cy.visit('/');
        cy.get('.ml-auto > .fa').click();
    });
    it('užpildomi prisijungimo duomenys', () => {
        cy.get('#usernameField').type(Cypress.env('user'));
        cy.get('#passwordField').type(Cypress.env('pass'));
        cy.get('.btn').click();
    });
    it("naudotojas nukreipiamas į pagrindinį tinklapį", () => {
        cy.url().should('eq', 'http://localhost:3000/')
    })
    it("naudotojas yra prijungiamas prie sistemos", () => {
        cy.get('span').contains(Cypress.env('user'))
    })
})
