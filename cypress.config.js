const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', (results) => {
        console.log('Report Upload is starting');

        /*
          Report Upload Request
          */



        console.log('Report Upload is finished');
      })
    },
  },
});
