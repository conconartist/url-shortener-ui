

describe('Main Display', () => {
    const mainUrl = 'http://localhost:3000';

    beforeEach(() => {
        cy.fixture('mock.json')
         .then(res => {
             cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
                 body: res
             })
         });
        cy.visit(mainUrl);
    })
    it('should display the page title', () => {
        cy
        .get('h1').contains('URL Shortener')
    })
    it('should display existing shortened URLs', () => {
        cy
        .get('.url').should('be.visible')
    })
    it('should display a form with a long url input and a title input', () => {
        cy
        .get('input[name=title]').should('be.visible')
        .get('input[name=urlToShorten]').should('be.visible')
    })
        
    it('should reflect information in the input field when a user fills out the form', () => {
        cy
        .get('input[name=title]').type('I hope this works')
        .get('input[name=urlToShorten]').type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
        .get('input[name=title]').should('have.value', 'I hope this works')
        .get('input[name=urlToShorten]').should('have.value', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    })
  
    it('should render a shortened url when a user fills out and submits the form', () => {
        cy
        .get('.url')
        .its('length').should('eq', 2)
        cy
        .intercept('POST', 'http://localhost:3001/api/v1/urls', {
            statusCode: 200,
            body: {
                "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", 
                "title": "Will this work?"
            }
            
        })
        .get('input[name=title]').type('Will this work?')
        .get('input[name=urlToShorten]').type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
        .get('button').click()
        cy.visit(mainUrl)
        .get('.url')
        .its('length').should('eq', 3)
    })

})