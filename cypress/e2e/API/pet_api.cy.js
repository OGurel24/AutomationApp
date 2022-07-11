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
})