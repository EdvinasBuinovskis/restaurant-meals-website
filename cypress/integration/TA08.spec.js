/* eslint-disable no-undef */
describe("TA8 sistemoje patalpinto patiekalo paieška pagal restoraną", () => {
    it('restorano tinklapio atidarymas', function () {
        cy.visit("/");
        cy.get('.card-title').contains("McDonald's").click();
    });
    it('atvaizduojami restorano patiekalai', function () {
        cy.contains(/^Mėsainis$/);
    });
})
