const {defineConfig} = require("cypress");

module.exports = defineConfig({
    reporter: 'mochawesome',
    e2e: {
        baseUrl: "http://todo-app-barkend.herokuapp.com/",
        setupNodeEvents(on, config) {
            on('after:run', async (results) => {
              console.log('Report Upload is starting');

              /*
                Report Upload Request to 'calliope'
                */

              const axios = require('axios');
              const FormData = require('form-data');
              const fs = require('fs');

              const form = new FormData();
              form.append('file[]',
                  fs.readFileSync('./mochawesome-report/mochawesome.json'),
                  './mochawesome-report/mochawesome.json');

              const response = await axios.post(
                  'https://app.calliope.pro/api/v2/profile/4390/import?tag[]=mac&tag[]=x64&tag[]=1\n',
                  form,
                  {
                    headers: {
                      ...form.getHeaders(),
                      'Content-Type': 'multipart/form-data',
                      'x-api-key': 'MDk1ZWYwZmJiZjBkYzg5YmMwY2NkOGVhMjgyMjBhY2Q0NWNkNzQzZWM1OTg0NzhjYjdiZjE4OGUwMzJkN2U4YjYy',
                    }
                  }
              );

              const statusCode = response.status;
              if(statusCode===201){
                  console.log('Report Upload is finished successfully');
              }
              else{
                  console.log('An error occured during Report Upload');
              }
            })
        },
    },
});
