/* eslint-disable no-undef */
describe("TA6 sistemos naudotojo patalpinto patiekalo pašalinimas", () => {

    before(() => {
        cy.login()
        cy.contains("Mano patiekalai")
    })

    it('patiekalo tinklapio atidarymas', function () {
        cy.get(':nth-child(4) > [data-test=nav-link]').click();
        cy.get('.list-group-item-action').click();
    });

    it('patiekalas pašalinamas', function () {
        cy.get(':nth-child(2) > button.btn').click();
    });

    it('naudotojas nukreipiamas į naudotojo patiekalų tinklapį', function () {
        cy.url().should('eq', 'http://localhost:3000/mymeals/')
    });

    it('patiekalas sėkmingai pašalintas', function () {
        cy.get('.list-group-item-action').should('not.exist');
    });
})
