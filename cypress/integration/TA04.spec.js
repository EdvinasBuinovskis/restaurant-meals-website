/* eslint-disable no-undef */
describe("TA4 sistemos naudotojo naujo patiekalo patalpinimas", () => {

    before(() => {
        cy.login()
        cy.contains("Mano patiekalai")
    })

    it('patalpinamas patiekalas', function () {
        cy.get(':nth-child(4) > [data-test=nav-link]').click();
        cy.get('.fas').click();
        cy.get('#nameField').type('Mesainis1');
        cy.get('#restaurantSelect').select('6079722b2aadbb0710855d4b');
        cy.get('#kcalField').type('170');
        cy.get('#proteinField').type('10');
        cy.get('#fatField').type('10');
        cy.get('#carbohydratesField').type('10');
        cy.get('#servingWeightField').type('100');
        cy.get('input[type="file"]').attachFile('mesainis1.jpg');
        cy.get('.btn').click();
    });
    it('naudotojas nukreipiamas į naudotojo patiekalų tinklapį', function () {
        cy.url().should('eq', 'http://localhost:3000/mymeals')
    });
    it('patiekalas sėkmingai patalpintas', function () {
        cy.contains("Mesainis1")
    });

})
