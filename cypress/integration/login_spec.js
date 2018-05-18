describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('http://192.168.7.128:4445/2018/2018-04-16%20GoTrade%20-V2.6.0-Pro/#login');

    cy.get(".c-selBroker").click();
    cy.get("#brokerView-search").type("MR").blur();
    // cy.get("#userName").type("2trade141").should('have.value', '2trade141');
    // cy.get("#userPassword").type("ZZZzzz222").should('have.value', 'ZZZzzz222');
    // cy.get("#userPassword").type("ZZZzzz222").should('have.value', 'ZZZzzz222');
    // cy.get("#subLogin").click();
    cy.get(".user-list").click();

    cy.get('.c-username').type("2trade141");
    cy.get('.c-password').type('ZZZzzz222');
    cy.get('.c-loginBtn').click();
  })
})