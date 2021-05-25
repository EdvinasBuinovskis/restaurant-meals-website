/* eslint-disable no-undef */
describe("TA13 sistemos administratoriaus patalpinto restorano redagavimas", () => {

    before(() => {
        cy.login(true)
        cy.contains("Mano patiekalai")
    })

    it('atidaromas restorano redagavimo tinklapis', function () {
        cy.contains("Restoranas1").click();
        cy.get('a.btn').click();
    });

    it('redaguojami restorano duomenys', function () {
        cy.get('#nameField').clear();
        cy.get('#nameField').type('Restoranas2');
        cy.get('.btn').click();
    });
    it('nukreipimas į restorano tinklapį', function () {
        cy.contains('.display-3', "Restoranas2")
    });
    it('restorano duomenys redaguoti sėkmingai', function () {
        cy.contains("Restoranas2")
    });

})
