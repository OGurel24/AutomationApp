describe('TODO api testing', () => {
    it('fetches Todo items - GET', async () => {
        const axios = require('axios');
        const FormData = require('form-data');
        const fs = require('fs');

        const form = new FormData();
        form.append('additionalMetadata', 'onur');
        form.append('file', fs.readFileSync('WhatsApp Image 2022-07-08 at 10.20.16.jpeg;type=image/jpeg'), 'WhatsApp Image 2022-07-08 at 10.20.16.jpeg;type=image/jpeg');

        const response = await axios.post(
            'https://petstore.swagger.io/v2/pet/1/uploadImage',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    });
});