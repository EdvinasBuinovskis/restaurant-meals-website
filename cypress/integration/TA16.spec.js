/* eslint-disable no-undef */
describe("TA16 fizinio krūvio paskaičiavimas, patiekalo kalorijoms sudeginti", () => {
    it('atidaromas patiekalo tinklapis', function () {
        cy.visit("/");
        cy.get(":nth-child(2) > [data-test=nav-link]").click();
        cy.contains(/^Mėsainis$/).click();
    });
    it('apskaičiuojama aktyvumo trukmė', function () {
        cy.get('.dropdown-toggle').click();
        cy.get('[value="Bėgiodami"]').click();
        cy.get('.form-control').type('70');
        cy.get('.card-body > :nth-child(5)').click();
    });
    it('aktyvumo trukmė apskaičiuota teisingai', function () {
        cy.get('.card-text').contains("Bėgiodami 30 minutes")
    });
})

