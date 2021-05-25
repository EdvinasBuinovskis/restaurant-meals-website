/* eslint-disable no-undef */
describe("TA14 sistemos administratoriaus pasirinkto patiekalo pažymėjimas „patikimu“", () => {

    before(() => {
        cy.login(true)
        cy.contains("Mano patiekalai")
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    });

    it('atidaromas patiekalo tinklapis', function () {
        cy.get(":nth-child(2) > [data-test=nav-link]").click();
        cy.contains(/^Mėsainis$/).click();
    });
    it('patiekalas patvirtinamas', function () {
        cy.contains('Patvirtinti').click();
    });
    it('patiekalas patvirtintas sėkmingai', function () {
        cy.contains('Pašalinti patvirtinimą');
        cy.get('.card-title > .fa').should('exist');
    });
})
