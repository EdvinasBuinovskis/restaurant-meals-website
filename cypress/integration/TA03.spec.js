/* eslint-disable no-undef */
describe("TA3 sistemos naudotojo prisijungimas prie sistemos", () => {

    it('atidaromas prisijungimo tinklapis', () => {
        cy.visit('/');
        cy.get('.ml-auto > .fa').click();
    });
    /* ==== Test Created with Cypress Studio ==== */
    it('užpildomi prisijungimo duomenys', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#usernameField').type('Naudotojas1');
        cy.get('#passwordField').type('Slaptazodis1');
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
    });
    it("naudotojas nukreipiamas į pagrindinį tinklapį", () => {
        cy.url().should('eq', 'http://localhost:3000/')
    })
    it("naudotojas yra prijungiamas prie sistemos", () => {
        cy.get('span').contains('Naudotojas1')
    })
})
