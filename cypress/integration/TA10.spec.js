/* eslint-disable no-undef */
describe("TA10 sistemos naudotojo pridėto patiekalo prie įsimintų patiekalų tinklapio pašalinimas", () => {

    before(() => {
        cy.login()
        cy.contains("Įsiminti")
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    });

    it('įsiminto patiekalo tinklapio atidarymas', function () {
        cy.get(':nth-child(3) > [data-test=nav-link]').click();
        cy.contains(/^Mėsainis$/).click();
    });

    it('patiekalo pašalinimas iš įsimintų', function () {
        cy.get('.fas').click();
    });

    it('patiekalas sėkmingai pašalintas iš įsimintų', function () {
        cy.get(':nth-child(3) > [data-test=nav-link]').click();
        cy.contains(/^Mėsainis$/).should("not.exist");
    });

})
