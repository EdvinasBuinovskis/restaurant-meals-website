/* eslint-disable no-undef */
describe("TA15 sistemos naudotojo atsijungimas nuo sistemos", () => {

    before(() => {
        cy.login(true)
        cy.contains("Mano patiekalai")
    })

    it('atsijungiama nuo sistemos', function () {
        cy.get('[href="#signout"] > .fa').click();
        cy.get(".ml-auto > .fa").should("exist");
    });
    it('pradingsta skiltys „Įsiminti“ bei „Mano patiekalai“', function () {
        cy.get(":nth-child(3) > [data-test=nav-link]").should("not.exist");
        cy.get(":nth-child(4) > [data-test=nav-link]").should("not.exist");
    });
})