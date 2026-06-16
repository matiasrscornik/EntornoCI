describe('Despliegue de la calculadora', () => {
  const bypassSecret = Cypress.env('VERCEL_AUTOMATION_BYPASS_SECRET');
  const visitOptions = bypassSecret
    ? {
        headers: {
          'x-vercel-protection-bypass': bypassSecret,
          'x-vercel-set-bypass-cookie': 'true',
        },
      }
    : undefined;

  beforeEach(() => {
    cy.visit('/', visitOptions);
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

  it('muestra error con inputs vacios', () => {
    cy.get('#concatButton').click();

    cy.get('#result').should(
      'have.text',
      'Resultados: Se deben ingresar dos numeros validos',
    );
  });

  it('actualiza el resultado en llamadas sucesivas', () => {
    cy.get('#number1').type('1');
    cy.get('#number2').type('2');
    cy.get('#concatButton').click();
    cy.get('#result').should('have.text', 'Resultados: 12');

    cy.get('#number1').clear().type('5');
    cy.get('#concatButton').click();
    cy.get('#result').should('have.text', 'Resultados: 52');
  });

  it('ignora espacios alrededor en el browser', () => {
    cy.get('#number1').type('  12  ');
    cy.get('#number2').type('  34  ');
    cy.get('#concatButton').click();

    cy.get('#result').should('have.text', 'Resultados: 1234');
  });
});
