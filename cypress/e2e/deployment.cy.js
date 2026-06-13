describe('Despliegue de la calculadora', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('carga la aplicacion desplegada', () => {
    cy.contains('h1', 'Calculadora').should('be.visible');
    cy.get('#number1').should('be.visible');
    cy.get('#number2').should('be.visible');
    cy.get('#concatButton').should('be.visible');
  });

  it('concatena dos numeros validos', () => {
    cy.get('#number1').type('12');
    cy.get('#number2').type('34');
    cy.get('#concatButton').click();

    cy.get('#result').should('have.text', 'Resultados: 1234');
  });

  it('muestra un mensaje para valores invalidos', () => {
    cy.get('#number1').type('abc');
    cy.get('#number2').type('34');
    cy.get('#concatButton').click();

    cy.get('#result').should(
      'have.text',
      'Resultados: Se deben ingresar dos numeros validos',
    );
  });
});
