/// <reference types="cypress" />

describe('nuxt-jsonld', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has ItemList jsonld', () => {
    cy.get('script[type="application/ld+json"]').should('exist').then(
      el => {
        const json = JSON.parse(el.text())
        expect(json).to.have.property('@context', 'https://schema.org')
        expect(json).to.have.property('@type', 'ItemList')
      }
    )
  })
})
