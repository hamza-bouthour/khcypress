const { defineConfig } = require("cypress");

const target = "https://www.instagram.com/";

module.exports = defineConfig({
  e2e: {
    baseUrl: target,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require("./cypress/plugins/index.js")(on, config);
    },
    // we can use this for external urls
    env: {
      instagram: "",
      facebook: "",
    },
  },
});
