/* eslint-disable no-undef */
describe("TA5 sistemos naudotojo patalpinto patiekalo redagavimas", () => {

    before(() => {
        cy.login()
        cy.contains("Mano patiekalai")
    })

    it('patiekalo redagavimo tinklapio atidarymas', function () {
        cy.get(':nth-child(4) > [data-test=nav-link]').click();
        cy.contains('Mesainis1').click();
        cy.get('.fa-edit').click();
    });

    it('redaguojamas patiekalas', function () {
        cy.get('#kcalField').clear();
        cy.get('#kcalField').type('18');
        cy.get('.btn').click();
    });

    it('naudotojas nukreipiamas į patiekalo tinklapį', function () {
        cy.get(".card-title").contains('Mesainis1')
    });

    it('redagavimas atliktas sėkmingai', function () {
        cy.get('.list-group > :nth-child(1)').contains('180')
    });
})
