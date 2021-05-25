/* eslint-disable no-undef */
describe("TA8 sistemoje patalpinto patiekalo paieška pagal restoraną", () => {
    it('restorano tinklapio atidarymas', function () {
        cy.visit("/");
        cy.get('[href="/restaurants/6079722b2aadbb0710855d4a"] > .card').click();
    });
    it('atvaizduojami restorano patiekalai', function () {
        cy.contains('Mėsainis');
    });
})
