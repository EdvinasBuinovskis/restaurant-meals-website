/* eslint-disable no-undef */
describe("TA11 sistemoje patalpinto patiekalo maistinės informacijos peržiūra", () => {
    it('patiekalo tinklapio atidarymas', function () {
        cy.visit("/");
        cy.get(':nth-child(2) > [data-test=nav-link]').click();
        cy.contains(/^Mėsainis$/).click();

    });
    it('patiekalo informacija atvaizduojama', function () {
        cy.contains('Kalorijos: 260');
        cy.contains('Baltymai: 13');
        cy.contains('Riebalai: 9.4');
        cy.contains('Angliavandeniai: 30');
    });
})


