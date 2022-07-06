describe('UI Tests', () => {
    beforeEach(() => {
        cy.visit('http://www.uitestingplayground.com/');
    })

    it.skip('1-Dynamic ID', () => {
        cy.contains('Dynamic ID')
            .click(); //navigate correct test

        cy.get('.btn.btn-primary') // find element and click
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
            .should('have.text', 'onur')
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
            .should('have.text', '75%');
    });

    it.skip('13-Visibility', () => {
        cy.contains('Visibility')
            .click(); //navigate correct test

        cy.get('.btn.btn-danger')
            .should('be.visible')
            .should('have.text', 'Removed');
        cy.get('.btn.btn-warning')
            .should('be.visible')
            .should('have.text', 'Zero Width');
        cy.get('.btn.btn-success')
            .should('be.visible')
            .should('have.text', 'Overlapped');
        cy.get('#transparentButton')
            .should('be.visible')
            .should('have.text', 'Opacity 0');
        cy.get('#invisibleButton')
            .should('be.visible')
            .should('have.text', 'Visibility Hidden');
        cy.get('#notdisplayedButton')
            .should('be.visible')
            .should('have.text', 'Display None');
        cy.get('#offscreenButton')
            .should('be.visible')
            .should('have.text', 'Offscreen');
        cy.get('.btn.btn-primary')
            .should('be.visible')
            .should('have.text', 'Hide').click(); // Hide button

        cy.get('.btn.btn-danger').should('')
        cy.get('.btn.btn-warning').should('not.be.visible')
        cy.get('.btn.btn-success').should('not.be.visible')
        cy.get('#transparentButton').should('not.be.visible')
        cy.get('#invisibleButton').should('not.be.visible')
        cy.get('#notdisplayedButton').should('not.be.visible')
        cy.get('#offscreenButton').should('not.be.visible')
        cy.get('.btn.btn-primary').should('be.visible')
    });

    it.skip('14-Sample App', () => {
        cy.contains('Sample App')
            .click(); //navigate correct test

        cy.get('[type="text"]')
            .type('onur');
        cy.get('[type="password"]')
            .type('pwd');
        cy.get('#login')
            .should('have.text', 'Log In')
            .click();

        cy.contains('Welcome, onur').should('exist');
    });

    it.skip('15-Mouse Over', () => {
        cy.contains('Mouse Over')
            .click(); //navigate correct test

        cy.contains('The link clicked 0 times.')
            .should('exist');

        for (let i = 0; i < 2; i++) {
            cy.contains('Click me')
                .click()
        }

        cy.contains('The link clicked 2 times.')
            .should('exist');
    });

    it.skip('16-Non-Breaking Space', () => {
        cy.contains('Non-Breaking Space')
            .click(); //navigate correct test

        cy.contains('My Button')
            .should('exist');
    });

    it.skip('17-Overlapped Element', () => {
        cy.contains('Overlapped Element')
            .click(); //navigate correct test

        cy.get('#name')
            .trigger('mouseover')
            .scrollTo(0, 1)
            .type('onur')
            .should('have.text', 'onur');

    });

    it.skip('18-Shadow DOM', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        let clipText;
        document.addEventListener('paste', function (event) {
            clipText = event.clipboardData.getData('Text');
        });
        cy.contains('Shadow DOM')
            .click(); //navigate correct test

        cy.get('guid-generator')
            .shadow()
            .find('#buttonGenerate')
            .click();


        cy.get('guid-generator')
            .shadow()
            .find('#buttonCopy')
            .click();


        cy.get('guid-generator')
            .shadow()
            .find('#editField')
            .invoke('val').as('password')

        cy.get('guid-generator')
            .shadow()
            .find('#editField')
            .click()
            .trigger('paste');

        cy.get('@password').then(text=>{
            expect(text).equal(clipText);
        })
    })
})
