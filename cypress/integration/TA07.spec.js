/* eslint-disable no-undef */
describe("TA7 sistemoje patalpinto patiekalo paieška pagal raktažodį", () => {
    it('atidaromas patiekalų paieškos tinklapis', function () {
        cy.visit("/");
        cy.get(':nth-child(2) > [data-test=nav-link]').click();
    });
    it('atvaizduojami patiekalai, pavadinime turintys įvestą raktažodį', function () {
        cy.get('.form-control').type('Mėsainis');
        cy.get(':nth-child(1) > .list-group-item-action').contains('Mėsainis');
    });
})