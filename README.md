# Proyecto de Integración Continua - Parcial 2

## 🚀 Descripción

Este proyecto implementa una calculadora simple de concatenación construida con HTML, CSS y JavaScript. A diferencia de una calculadora tradicional, la aplicación no suma valores: concatena dos números ingresados por el usuario y muestra el resultado como texto.

El repositorio también incluye un flujo de Integración Continua con GitHub Actions que automatiza linting, pruebas unitarias con cobertura, análisis con SonarCloud, despliegue en Vercel y pruebas E2E con Cypress contra el deploy real. Además, integra notificaciones hacia Jira y Slack para informar el estado del pipeline.

<img width="600" alt="Diagrama del pipeline de CI/CD" src="https://github.com/user-attachments/assets/e88f5d28-599a-4070-b23c-1732ba0555b6" />

## 🛠️ Tecnologías utilizadas

- HTML: estructura de la aplicación.
- CSS: estilos y diseño responsive.
- JavaScript ES Modules: lógica principal de concatenación.
- Node.js y npm: entorno de ejecución y gestión de dependencias.
- Vite: servidor de desarrollo y build de producción.
- Vitest: pruebas unitarias y cobertura.
- Cypress: pruebas E2E contra el sitio desplegado.
- ESLint: verificación de estilo y calidad de código.
- GitHub Actions: automatización del pipeline de CI/CD.
- SonarCloud: análisis estático y métricas de calidad.
- Vercel: despliegue de producción.
- Docker y Docker Compose: ejecución opcional del proyecto en contenedores (no forma parte del flujo de deploy, que se hace directo a Vercel).
- Jira: notificaciones y trazabilidad del flujo de trabajo.
- Slack: alertas sobre estado de tests, build, deploy y pruebas E2E.

## 🧩 Funcionalidades

- Ingreso de dos valores numéricos.
- Concatenación de ambos valores en lugar de una suma.
- Validación básica de campos vacíos o inválidos.
- Pruebas unitarias sobre la función principal.
- Pruebas E2E sobre el sitio ya desplegado en Vercel.
- Pipeline automático de linting, tests, coverage, build, análisis de calidad, deploy y E2E.

## 📁 Estructura del proyecto

- `src/`: aplicación principal.
  - `src/app.js`: lógica que conecta la interfaz con la función de concatenación.
  - `src/concatenate.js`: función principal de negocio.
  - `src/index.html`: estructura de la interfaz.
  - `src/styles.css`: estilos visuales.
- `test/`: pruebas unitarias (Vitest).
  - `test/e2e/`: pruebas E2E (Cypress) contra el sitio desplegado.
- `cypress.config.js`: configuración de Cypress (specs, screenshots y videos en `test/e2e/`).
- `.github/workflows/ci.yml`: pipeline de CI/CD.
- `scripts/`: scripts de notificación para Jira y Slack.
- `sonar-project.properties`: configuración del análisis de SonarCloud.
- `Dockerfile`: imagen opcional para correr el proyecto en un contenedor.
- `docker-compose.yml`: servicios opcionales de desarrollo (`app`) y validación (`lint`, `test`) en Docker.


## ✅ Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo con Vite.
- `npm run build`: genera la versión optimizada para producción.
- `npm run preview`: sirve localmente el build de producción.
- `npm run lint`: ejecuta ESLint sobre el código.
- `npm test`: corre las pruebas unitarias con Vitest.
- `npm run test:coverage`: corre las pruebas unitarias generando reporte de cobertura (usado por SonarCloud).
- `npm run e2e:open`: abre la interfaz de Cypress para pruebas E2E interactivas.
- `npm run e2e:run`: corre las pruebas E2E de Cypress en modo headless.
- `npm run jira:notify`: envía notificación a Jira.
- `npm run slack:notify`: envía notificación a Slack.

## 🔄 Pipeline de CI/CD

El pipeline de GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)) se dispara en push y pull requests hacia `main`, y está dividido en jobs encadenados:

1. **lint-check**: instala dependencias y corre ESLint.
2. **test-coverage-sonar** (depende de `lint-check`): corre tests con cobertura, build de Vite y escaneo de SonarCloud usando el reporte de cobertura generado. Notifica a Slack si falla.
3. **deploy-production** (depende de `test-coverage-sonar`, solo en push a `main`): despliega a Vercel y expone la URL del deploy. Notifica a Slack si falla.
4. **cypress-e2e** (depende de `deploy-production`): corre las pruebas E2E de Cypress contra la URL recién desplegada. Sube screenshots/videos como evidencia si falla.
5. **notify-pipeline-result** (depende de todos los anteriores, solo en push a `main`): calcula el estado global del pipeline y notifica a Jira (incluyendo la rama de origen si el push viene de un merge de PR) y a Slack.

## 🐳 Uso opcional con Docker

El proyecto no se despliega con Docker (Vercel construye y sirve la app directamente), pero el `Dockerfile` permite levantarlo en un contenedor para entornos locales sin Node instalado:

```bash
docker build -t entornoci .
docker run -p 4173:4173 entornoci
```

También se puede usar `docker-compose.yml` para desarrollo con hot reload (`app`) o para correr lint/tests dentro de un contenedor (`lint`, `test`, bajo el perfil `checks`):

```bash
docker compose up app
docker compose --profile checks run lint
docker compose --profile checks run test
```