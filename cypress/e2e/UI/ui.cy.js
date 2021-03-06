describe('UI Tests', () => {
    beforeEach(() => {
        cy.visit('http://www.uitestingplayground.com/');
    })

    it('1-Dynamic ID', () => {
        cy.contains('Dynamic ID')
            .click(); //navigate correct test

        cy.get('.btn.btn-primary') // find element and click
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

    it('3-Hidden Layers', () => {
        cy.contains('Hidden Layers')
            .click(); //navigate correct test
        cy.get('#greenButton')
            .should('be.visible')
            .click();

        cy.get('#greenButton') // z-index of green button is 1
            .parents('.spa-view')
            .should('have.attr', 'style', 'z-index: 1;');

        cy.get('#blueButton') // z-index of blue button is 1 and it is visible
            .should('be.visible')
            .parents('.spa-view')
            .should('have.attr', 'style', 'z-index: 2;');
    });

    it('4-Load Delays', () => {
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

    it('6-Client Side Delay', () => {
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

    it('7-Click', () => {
        cy.contains('Click')
            .click(); //navigate correct test
        cy.get('.btn.btn-success')
            .should('not.exist');
        cy.get('.btn.btn-primary')
            .trigger('click'); // trigger click
        cy.get('.btn.btn-success')
            .should('exist');
    });

    it('8-Text Input', () => {
        cy.contains('Text Input')
            .click(); //navigate correct test
        cy.get('.form-control')
            .type('onur');
        cy.get('.btn.btn-primary')
            .click()
            .should('have.text', 'onur')
    });

    it('9-Scrollbars', () => {
        cy.contains('Scrollbars')
            .click(); //navigate correct test
        cy.get('#github')
            .trigger('mouseover');
    });

    it('10-Dynamic Table', () => {
        cy.contains('Dynamic Table')
            .click(); //navigate correct test

        cy.get('.bg-warning').invoke('text').then(percentageTable => {
            cy.get('[role="table"]')
                .contains('Chrome')
                .parent('[role="row"]')
                .contains('%')
                .invoke('text').then(percentageFooter => {
                expect(percentageTable).to.contain(percentageFooter);
            })
        });
    });

    it('11-Verify Text', () => {
        cy.contains('Verify Text')
            .click(); //navigate correct test
        cy.contains('Welcome')
            .should('exist')
    });

    it('12-Progress Bar', () => {
        cy.contains('Progress Bar')
            .click(); //navigate correct test
        cy.get('#startButton')
            .should('exist')
            .click();
        cy.get('#progressBar')
            .contains(new RegExp('7[56789]'), {timeout: 40000});
        cy.get('#stopButton')
            .click();
        cy.get('#progressBar')
            .should('have.text', '75%');
    });

    it('13-Visibility', () => {
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

        cy.get('.btn.btn-danger').should('not.exist')
        cy.get('.btn.btn-warning').should('not.be.visible')
        cy.get('.btn.btn-success').should('have.css', 'color', 'rgb(255, 255, 255)')
        cy.get('#transparentButton').should('not.be.visible')
        cy.get('#invisibleButton').should('not.be.visible')
        cy.get('#notdisplayedButton').should('not.be.visible')
        cy.get('#offscreenButton').should('have.css', 'color', 'rgb(255, 255, 255)')
        cy.get('.btn.btn-primary').should('be.visible')
    });

    it('14-Sample App', () => {
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

    it('15-Mouse Over', () => {
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

    it('16-Non-Breaking Space', () => {
        cy.contains('Non-Breaking Space')
            .click(); //navigate correct test

        cy.contains('My Button')
            .should('exist');
    });

    it('17-Overlapped Element', () => {
        cy.contains('Overlapped Element')
            .click(); //navigate correct test

        cy.get('#name').focus()
            .type('onur')
            .invoke('val') // read the value
            .as('text')
            .should('equal', 'onur', '@text');
    });

    it.skip('18-Shadow DOM', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false // for preventing console error
        })

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

        // event listener for paste event
        let clipText;
        document.addEventListener('paste', function (event) {
            clipText = event.clipboardData.getData('Text');
        });

        cy.get('guid-generator')
            .shadow()
            .find('#editField').type('{meta+ctrl+v}') // paste for all operating systems

        cy.get('@password').then(text => {
            expect(text).equal(clipText);
        })
    })
})
