/* eslint-disable no-undef */
describe("TA12 sistemos administratoriaus naujo restorano patalpinimas", () => {

    before(() => {
        cy.login(true)
        cy.contains("Mano patiekalai")
    })

    it('atidaromas restorano kūrimo tinklapis ir užpildoma informacija', function () {
        cy.get('.fas').click();
        cy.get('#nameField').type('Restoranas1');
        cy.get('input[type="file"]').attachFile('restaurant1.jpg');
        cy.get('#descriptionField').type('Restoranas1 aprašymas');
        cy.get('.btn').click();
    });
    it('administratorius nukreipiamas į restoranų tinklapį', function () {
        cy.url().should('eq', 'http://localhost:3000/restaurants')
    });
    it('restoranas patalpintas sėkmingai', function () {
        cy.contains("Restoranas1")
    });

})
