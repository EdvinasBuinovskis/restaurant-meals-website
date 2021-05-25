/* eslint-disable no-undef */
describe("TA1 sistemos pagrindinio tinklapio „Restoranai“ atidarymas ", () => {
    it("tinklapis atvaizduojamas", () => {
        cy.visit("/")
        cy.get("h5").contains("McDonald's")
    })
})