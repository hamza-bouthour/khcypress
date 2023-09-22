import { faker } from "@faker-js/faker";

Cypress.Commands.add("navigateToIGLoginPage", () => {
  cy.visit("/accounts/emailsignup/");
  cy.staySameWindow();
  // weird behavior... navigating to login page again
  cy.get("a", { timeout: 15000 }).contains("Sign Up").click({ force: true });

  // we will intercept requests later
  cy.get(`button[type="submit"]`, { timeout: 15000 })
    .contains("Sign up")
    .should("exist");
});

export const formValidator = (user) => {
  // check that all fields are valid
  for (const field in user) {
    if (field !== "password") {
      cy.get(`input[name="${user[field].id}"]`)
        .parent("label")
        .siblings("div")
        .children()
        .its("length")
        .then((length) => {
          if (length > 1) {
            // value already exists
            // this is stupid but im sleepy
            if (field == "userName") {
              cy.get(`input[name="${user[field].id}"]`).clear();
              cy.get(`input[name="${user[field].id}"]`).type(
                faker.lorem.words(1) +
                  faker.number.int({ min: 900, max: 1600 }),
                { delay: 10 }
              );
            } else {
              cy.get(`input[name="${user[field].id}"]`).clear();
              cy.get(`input[name="${user[field].id}"]`).type(
                faker.internet.email()
              );
            }
            return formValidator(user);
          }
        });
    }
  }
};

Cypress.Commands.add("fillSignUpForm", (user) => {
  cy.intercept({ method: "POST", path: `/web_create_ajax/attempt/*` }).as(
    "signedUp"
  );
  // fill the form
  for (const field in user) {
    cy.get(`input[name="${user[field].id}"]`).type(user[field].value, {
      delay: 5,
    });
  }
  formValidator(user);

  // submit form,
  cy.get(`button[type="submit"]`).contains("Sign up").click({ force: true });
  cy.wait("@signedUp").then((interception) => {
    cy.log(interception);
  });

  cy.pause();
});
