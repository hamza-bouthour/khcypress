import { faker } from "@faker-js/faker";
import { generateUserDetails } from "./account_helper";

// generate random with and height
const height = faker.number.int({ min: 900, max: 1600 });
const width = faker.number.int({ min: 700, max: 1100 });

// Test implementation starts here
describe("Create an Instagram account", () => {
  // set viewport
  before(() => {
    cy.viewport(height, width);
  });

  // task create an IG account
  it("Instagram account created", () => {
    // generate user details
    let user = generateUserDetails();

    cy.navigateToIGLoginPage().fillSignUpForm(user);

    // when the above is successful
    cy.task("addAccountToLogs", user).then((data) => {
      cy.log(data);
    });
  });
});
