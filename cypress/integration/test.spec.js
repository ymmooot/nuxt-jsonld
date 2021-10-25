/// <reference types="cypress" />

const fullpath = (path) => {
  return `${Cypress.config().baseUrl}${path}`;
};

describe('nuxt-jsonld', () => {
  it('dumps jsonld with Options API', () => {
    cy.visit('/');
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        const json = JSON.parse(el.text());
        expect(json).to.have.property('@context', 'https://schema.org');
        expect(json).to.have.property('@type', 'ItemList');
      });
  });

  it('dumps static jsonld', () => {
    cy.visit('/static');
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        const json = JSON.parse(el[0].innerText);
        expect(json).to.have.property('@context', 'https://schema.org');
        expect(json).to.have.property('@type', 'Thing');
        expect(json).to.have.property('name', 'Static json');

        const json2 = JSON.parse(el[1].innerText);
        expect(json2).to.have.property('@context', 'https://schema.org');
        expect(json2).to.have.property('@type', 'Thing');
        expect(json2).to.have.property('name', 'test');
      });
  });

  it('dumps reactive jsonld', () => {
    cy.visit('/products/foo');
    const clock = cy.clock(Date.UTC(2022, 0, 1, 13, 10, 10));

    // empty tag is shown
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        expect(el.text()).eq('');
      });

    // jsonld is set
    cy.contains('Update Purchase Date').click();
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        const json = JSON.parse(el.text());
        expect(json).to.have.property('@context', 'https://schema.org');
        expect(json).to.have.property('@type', 'Product');
        expect(json).to.have.property('name', 'foo');
        expect(json).to.have.property('description', 'This is a sample foo product.');
        expect(json).to.have.property('purchaseDate', '2022-01-01T13:10:10.000Z');
      });

    // one second elapsed
    clock.tick(1000);

    // purchase date is updated
    cy.contains('Update Purchase Date').click();
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        const json = JSON.parse(el.text());
        expect(json).to.have.property('@context', 'https://schema.org');
        expect(json).to.have.property('@type', 'Product');
        expect(json).to.have.property('name', 'foo');
        expect(json).to.have.property('description', 'This is a sample foo product.');
        expect(json).to.have.property('purchaseDate', '2022-01-01T13:10:11.000Z');
      });
  });

  it('replaces jsonld on page transition', () => {
    cy.visit('/static');
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        expect(JSON.parse(el[0].innerText)).to.have.property('name', 'Static json');
        expect(JSON.parse(el[1].innerText)).to.have.property('name', 'test');
      });
    cy.get('script[type="application/ld+json"]').should('have.length', 2);

    cy.contains('Back to list').click();
    cy.url().should('equal', fullpath('/'));
    cy.get('script[type="application/ld+json"]')
      .should('exist')
      .then((el) => {
        const json = JSON.parse(el.text());
        expect(json).to.not.have.property('name', 'static');
        expect(json).to.have.property('@type', 'ItemList');
      });
    cy.get('script[type="application/ld+json"]').should('have.length', 1);
  });
});
