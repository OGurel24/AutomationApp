const axios = require('axios');
let user;

describe('Try',()=>{
    beforeEach(()=>{
        cy.fixture('users').then(userFixture =>{
            user = userFixture;
        })
    })
    it('1-',   () => {

        expect(user['name']).equal('Onur Graham');
        user['name']= 'Onur Gurel';

        cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
            'id': 0,
            'category': {
                'id': 0,
                'name': 'string'
            },
            'name': 'doggie',
            'photoUrls': [
                'string'
            ],
            'tags': [
                {
                    'id': 0,
                    'name': 'string'
                }
            ],
            'status': 'available'
        }).then(
            (response) => {
                expect(response.statusText).equal('OK')
                expect(user['name']).equal('Onur Gurel');
            }
        )
    });

    it('2-',   () => {

        expect(user['name']).equal('Onur Graham');

    })

})