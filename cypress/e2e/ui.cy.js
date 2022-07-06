describe('UI Tests', () => {
    beforeEach(() => {
        cy.visit('http://www.uitestingplayground.com/');
    })

    it.skip('1-Dynamic ID', () => {
        cy.contains('Dynamic ID')
            .click(); //navigate correct test
        cy.get('.btn.btn-primary')
            .click();
    });

    it.skip('2-Class Attribute', () => {
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

    it.skip('5-AJAX Data', () => {
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

    it.skip('6-Client Side Delay', () => {
        cy.contains('Client Side Delay')
            .click(); //navigate correct test

        cy.contains('Data calculated on the client side.')
            .should('not.exist');
        cy.get('.btn.btn-primary')
            .click();
        cy.contains('Data calculated on the client side.', {timeout: 20000})
            .should('exist')
            .should('be.visible');
    });

    it.skip('7-Click', () => {
        cy.contains('Click')
            .click(); //navigate correct test
        cy.get('.btn.btn-success')
            .should('not.exist');
        cy.get('.btn.btn-primary')
            .trigger('click'); // trigger click
        cy.get('.btn.btn-success')
            .should('exist');
    });

    it.skip('8-Text Input', () => {
        cy.contains('Text Input')
            .click(); //navigate correct test
        cy.get('.form-control')
            .type('onur');
        cy.get('.btn.btn-primary')
            .click()
            .should('have.text','onur')
    });

    it.skip('9-Scrollbars', () => {
        cy.contains('Scrollbars')
            .click(); //navigate correct test
        cy.get('#github')
            .trigger('mouseover');
    });

    it.skip('11-Verify Text', () => {
        cy.contains('Verify Text')
            .click(); //navigate correct test
        cy.contains('Welcome')
            .should('exist')
    });

    it.skip('12-Progress Bar', () => {
        cy.contains('Progress Bar')
            .click(); //navigate correct test
        cy.get('#startButton')
            .should('exist')
            .click();
        cy.get('#progressBar')
            .contains('75%', {timeout: 20000});
        cy.get('#stopButton')
            .click();
        cy.get('#progressBar')
            .should('have.text','75%');
    });
})
