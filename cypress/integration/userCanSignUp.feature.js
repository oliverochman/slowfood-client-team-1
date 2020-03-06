describe("user can sign up", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:registration.json"
    });
    
    cy.get("#signup").click();
    cy.get("#signup-form").within(() => {
      cy.get("#name").type("Mike Shum");
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#confirm_password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#message").should("contain", "Hi user@mail.com");
  });

  it("with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid entries. Please try again."],
        success: false
      }
    });

    cy.get("#signup").click();
    cy.get("#signup-form").within(() => {
      cy.get("#name").type("Mike Shum");
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#confirm_password").type("passworddd");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#message").should("contain", "Invalid entries. Please try again.");
  });
});
