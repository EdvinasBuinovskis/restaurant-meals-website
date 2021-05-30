/* eslint-disable no-undef */
describe("TA9 sistemoje patalpintų patiekalų pridėjimas prie naudotojo įsimintų patiekalų", () => {

    before(() => {
        cy.login()
        cy.contains("Įsiminti")
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    });

    it('patiekalo tinklapio atidarymas', function () {
        cy.get(':nth-child(2) > [data-test=nav-link]').click();
        cy.contains(/^Mėsainis$/).click();
    });

    it('patiekalo pridėjimas prie įsimintų', function () {
        cy.get('.far').click();
    });

    it('patiekalas sėkmingai pridėtas prie įsimintų', function () {
        cy.get(':nth-child(3) > [data-test=nav-link]').click();
        cy.contains(/^Mėsainis$/);
    });

})
