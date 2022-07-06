describe('UI Tests', () => {
    beforeEach(() => {
        cy.visit('http://www.uitestingplayground.com/');
    })

    it('1-Dynamic ID', () => {
        cy.contains('Dynamic ID')
            .click(); //navigate correct test
        cy.get('.btn.btn-primary')
            .click();
    });

    it('2-Class Attribute', () => {
        cy.contains('Class Attribute')
            .click(); //navigate correct test
        cy.get('.btn-primary.btn-test')
            .last() // last button is blue one
            .click();
        cy.on('window:alert', (t) => {
            expect(t).to.contains('Primary button pressed');
        })
    });

    it.skip('3-Hidden Layers', () => {
        cy.contains('Hidden Layers')
            .click(); //navigate correct test
        cy.get('#greenButton')
            .should('be.visible')
            .click();

        cy.get('#greenButton')
            .parent()
            .find('.spa-view')
            .should('have.css', 'style', 'z-index: 2;')
        ;
        cy.get('#blueButton')
            .should('be.visible');
    });

    it.skip('4-Load Delays', () => {
        cy.contains('Load Delay')
            .click(); //navigate correct test
        cy.get('.btn.btn-primary', {timeout: 15000}) // wait up to 15 seconds
            .click();
    });

    it('5-AJAX Data', () => {
        cy.contains('AJAX Data')
            .click(); //navigate correct test

        cy.contains('Data loaded with AJAX get request.')
            .should('not.exist');
        cy.get('.btn.btn-primary')
            .click();
        cy.contains('Data loaded with AJAX get request.', {timeout: 20000})
            .should('exist')
            .should('be.visible');
    });

})
