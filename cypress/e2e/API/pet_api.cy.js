let petData;

describe('Pet API', () => {
    beforeEach(() => {
        cy.fixture('pet').then(petFixture => {
            petData = petFixture; // set JSON for each case
        })
    })

    // POST requests to '/pet'
    describe.skip('Create pet data',()=>{

        it('1- Create | Base case ', () => {
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body).to.deep.equal(petData)
                }
            )
        });

        it('2- Create | Without ID, API assigns automatically incremented number as ID ', () => {
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

        it('3- Create | ID should be numeric ', () => {
            petData['id'] = 'onur'; //invalid type, id should be a number
            cy.request({method: 'POST', url: 'https://petstore.swagger.io/v2/pet', body: petData, failOnStatusCode: false})
                .then((response) => {
                        expect(response.status).equal(500);
                        expect(response.statusText).equal('Internal Server Error');
                        expect(response.body['message']).equal('something bad happened')
                    }
                )
        });

        it('4- Create | Name is not mandatory ', () => {
            delete petData['name']; // delete ID before request
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body).to.deep.contains(petData); // remained part is same
                }
            )
        });

        it('5- Create | Category is not mandatory ', () => {
            delete petData['category']; // delete Category before request
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body).to.deep.contains(petData); // remained part is same
                }
            )
        });

        it('6- Create | Automatically stringify the accidentally given numeric values', () => {
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

        it('7- Create | Can have more than 1 image', () => {
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

        it('8- Create | Empty body case', () => {
            petData = []
            cy.request({method: 'POST', url: 'https://petstore.swagger.io/v2/pet', body: petData, failOnStatusCode: false})
                .then((response) => {
                        expect(response.status).equal(500);
                        expect(response.statusText).equal('Internal Server Error');
                        expect(response.body['message']).equal('something bad happened');
                    }
                )
        });
    });

    // PUT requests to '/pet'
    describe('Update pet data',()=>{

        it('9- Update | Base case ', () => {
            petData['name']='Gandalf';
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body).to.deep.equal(petData);
                }
            )
        });

        it('10- Update | Without ID, behaves like a new data stored', () => {
            delete petData['id'];
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(typeof response.body['id']).equal('number'); // auto incremented ID is assigned
                    expect(response.body).to.deep.contains(petData); // remained part is same
                }
            )
        });

        it('11- Update | Missing key update', () => {
            petData['name'] = 'Aragorn';
            petData['id'] = Math.floor(Math.random() * 1000) + 1;
            petData['tags']['color'] = 'turquoise'; // there is no color data of the object
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body['tags']['color']).be.undefined; // there is still no color
                    delete petData['tags']['color'];
                    expect(response.body).to.deep.equal(petData); // remained part is same
                }
            )
        });

        it('12- Update | Empty body case', () => {
            petData = []
            cy.request({method: 'PUT', url: 'https://petstore.swagger.io/v2/pet', body: petData, failOnStatusCode: false})
                .then((response) => {
                        expect(response.status).equal(500);
                        expect(response.statusText).equal('Internal Server Error');
                        expect(response.body['message']).equal('something bad happened');
                    }
                )
        });
    });

    // PUT requests to '/pet'
    describe('Upload photo',()=>{

        it('9- Update | Base case ', () => {
            petData['name']='Gandalf';
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body).to.deep.equal(petData);
                }
            )
        });

        it('10- Update | Without ID, behaves like a new data stored', () => {
            delete petData['id'];
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(typeof response.body['id']).equal('number'); // auto incremented ID is assigned
                    expect(response.body).to.deep.contains(petData); // remained part is same
                }
            )
        });

        it('11- Update | Missing key update', () => {
            petData['name'] = 'Aragorn';
            petData['id'] = Math.floor(Math.random() * 1000) + 1;
            petData['tags']['color'] = 'turquoise'; // there is no color data of the object
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petData).then(
                (response) => {
                    expect(response.status).equal(200);
                    expect(response.statusText).equal('OK');
                    expect(response.body['tags']['color']).be.undefined; // there is still no color
                    delete petData['tags']['color'];
                    expect(response.body).to.deep.equal(petData); // remained part is same
                }
            )
        });

        it('12- Update | Empty body case', () => {
            petData = []
            cy.request({method: 'PUT', url: 'https://petstore.swagger.io/v2/pet', body: petData, failOnStatusCode: false})
                .then((response) => {
                        expect(response.status).equal(500);
                        expect(response.statusText).equal('Internal Server Error');
                        expect(response.body['message']).equal('something bad happened');
                    }
                )
        });
    });

})