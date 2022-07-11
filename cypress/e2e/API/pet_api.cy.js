let petData;

describe('Pet API', () => {
    beforeEach(() => {
        cy.fixture('pet').then(petFixture => {
            petData = petFixture;
        })
    })

    it('1- Base case ', () => {
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.statusText).equal('OK');
                expect(response.body).to.deep.equal(petData)
            }
        )
    });

    it('2- Without ID, API assigns automatically incremented number as ID ', () => {
        delete petData['id']; // delete ID before request
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.statusText).equal('OK');
                expect(typeof response.body['id']).equal('number'); // auto incremented ID is assigned
                expect(response.body).to.deep.contains(petData); // remained part is same
            }
        )
    });

    it('3- ID should be numeric ', () => {
        petData['id'] = 'onur'; //invalid type, id should be a number
        cy.request({method: 'POST', url: 'https://petstore.swagger.io/v2/pet', body: petData, failOnStatusCode: false})
            .then((response) => {
                    expect(response.status).equal(500);
                    expect(response.statusText).equal('Internal Server Error');
                    expect(response.body['message']).equal('something bad happened')
                }
            )
    });

    it('4- Name is not mandatory ', () => {
        delete petData['name']; // delete ID before request
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.statusText).equal('OK');
                expect(response.body).to.deep.contains(petData); // remained part is same
            }
        )
    });

    it('5- Category is not mandatory ', () => {
        delete petData['category']; // delete Category before request
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.statusText).equal('OK');
                expect(response.body).to.deep.contains(petData); // remained part is same
            }
        )
    });

    it('6- Automatically stringify the accidentally given numeric values', () => {
        petData['name'] = 2424; // name should be a string
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.statusText).equal('OK');
                expect(response.body['name']).not.be.equal(petData['name']) // not equal since type difference
                expect(response.body['name']).equal(petData['name'].toString()) // but equal string equivalent
                delete petData['name'];
                expect(response.body).to.deep.contains(petData); // remained part is same
            }
        )
    });

    it('7- Can have more than 1 image', () => {
        const newImage = 'https://i0.wp.com/ortadunya.com/wp-content/uploads/2018/12/sarumang-andalf.jpg';
        petData['photoUrls'].push(newImage);
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
            (response) => {
                expect(response.status).equal(200);
                expect(response.statusText).equal('OK');
                expect(response.body['photoUrls'].length).equal(2);
                expect(response.body).to.deep.equal(petData);
            }
        )
    });

    it('8- Empty body case', () => {
        petData = []
        cy.request({method: 'POST', url: 'https://petstore.swagger.io/v2/pet', body: petData, failOnStatusCode: false})
            .then((response) => {
                    expect(response.status).equal(500);
                    expect(response.statusText).equal('Internal Server Error');
                    expect(response.body['message']).equal('something bad happened');
                }
            )
    });
})