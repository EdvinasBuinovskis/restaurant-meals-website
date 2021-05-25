/* eslint-disable no-undef */
describe("TA2 sistemos naudotojo registracija prie sistemos", () => {

    it('atidaromas registracijos tinklapis', () => {
        cy.visit('/');
        cy.get('.ml-auto > .fa').click();
        cy.get('.col-md-4 > a').click();
    });
    it('užpildomi registracijos duomenys', () => {
        cy.get('#usernameField').type('Naudotojas1');
        cy.get('#emailField').type('Naudotojas1@gmail.com');
        cy.get('#passwordField').type('Slaptazodis1');
        cy.get('#confirmPasswordField').type('Slaptazodis1');
        cy.get('.btn').click();
    });
    it("naudotojas nukreipiamas į pagrindinį tinklapį", () => {
        cy.url().should('eq', 'http://localhost:3000/')
    })
    it("naudotojas yra prisijungęs", () => {
        cy.get('span').contains('Naudotojas1')
    })

})