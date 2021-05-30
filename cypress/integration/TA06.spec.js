/* eslint-disable no-undef */
describe("TA6 sistemos naudotojo patalpinto patiekalo pašalinimas", () => {

    before(() => {
        cy.login()
        cy.contains("Mano patiekalai")
    })

    it('patiekalo tinklapio atidarymas', function () {
        cy.get(':nth-child(4) > [data-test=nav-link]').click();
        cy.contains('Mesainis1').click();
    });

    it('patiekalas pašalinamas', function () {
        cy.get(':nth-child(3) > .fas').click();
    });

    it('naudotojas nukreipiamas į naudotojo patiekalų tinklapį', function () {
        cy.url().should('eq', 'http://localhost:3000/mymeals/')
    });

    it('patiekalas sėkmingai pašalintas', function () {
        cy.contains('Mesainis1').should('not.exist');
    });
})
