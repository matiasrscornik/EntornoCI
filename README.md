# Proyecto de Integración Continua - Parcial 2

## 🚀 Descripción

Este proyecto implementa una calculadora simple de concatenación construida con HTML, CSS y JavaScript. A diferencia de una calculadora tradicional, la aplicación no suma valores: concatena dos números ingresados por el usuario y muestra el resultado como texto.

Aunque la interfaz corre en el navegador, el proyecto utiliza Node.js como entorno de ejecución para Vite, Vitest, ESLint y los scripts de automatización.

El repositorio también incluye un flujo de Integración Continua con GitHub Actions que automatiza validaciones de calidad, pruebas, análisis con SonarCloud y despliegue en Vercel. Además, integra notificaciones hacia Jira y Slack para informar el estado del pipeline.

## 🛠️ Tecnologías utilizadas

- HTML: estructura de la aplicación.
- CSS: estilos y diseño responsive.
- JavaScript ES Modules: lógica principal de concatenación.
- Node.js y npm: entorno de ejecución y gestión de dependencias.
- Vite: servidor de desarrollo y build de producción.
- Vitest: pruebas unitarias.
- ESLint: verificación de estilo y calidad de código.
- GitHub Actions: automatización del pipeline de CI/CD.
- SonarCloud: análisis estático y métricas de calidad.
- Vercel: despliegue de producción.
- Docker y Docker Compose: ejecución del proyecto en contenedores.
- Jira: notificaciones y trazabilidad del flujo de trabajo.
- Slack: alertas sobre estado de tests, coverage, build y deploy.

## 🧩 Funcionalidades

- Ingreso de dos valores numéricos.
- Concatenación de ambos valores en lugar de una suma.
- Validación básica de campos vacíos.
- Pruebas unitarias sobre la función principal.
- Pipeline automático de linting, tests, coverage, build y análisis de calidad.

## 📁 Estructura del proyecto

- `src/`: aplicación principal.
- `src/app.js`: lógica que conecta la interfaz con la función de concatenación.
- `src/concatenate.js`: función principal de negocio.
- `src/index.html`: estructura de la interfaz.
- `src/styles.css`: estilos visuales.
- `test/`: pruebas unitarias.
- `.github/workflows/ci.yml`: pipeline de CI/CD.
- `scripts/`: scripts de notificación para Jira y Slack.
- `Dockerfile`: imagen para ejecutar el proyecto con Docker.
- `docker-compose.yml`: servicios para desarrollo y validación.

## 🏃‍♂️ Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

```bash
git clone https://github.com/matiasrscornik/EntornoCI.git
```

2. Entrar al directorio del proyecto:

```bash
cd EntornoCI
```

3. Instalar dependencias:

```bash
npm install
```

4. Levantar el servidor de desarrollo:

```bash
npm run dev
```

## ✅ Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo con Vite.
- `npm run build`: genera la versión optimizada para producción.
- `npm run lint`: ejecuta ESLint sobre el código.
- `npm test`: corre lint + pruebas unitarias.
- `npm run test:coverage`: corre lint + pruebas con cobertura.
- `npm run jira:notify`: envía notificación a Jira.
- `npm run slack:notify`: envía notificación a Slack.

## 🔄 Pipeline de CI/CD

El flujo automatizado definido en GitHub Actions realiza los siguientes pasos:

1. Checkout del repositorio.
2. Configuración de Node.js 22.
3. Instalación de dependencias con `npm ci`.
4. Ejecución de lint, tests y coverage.
5. Build de la aplicación.
6. Escaneo de calidad con SonarCloud.
7. Notificación a Jira en todos los casos.
8. Notificación a Slack si falla alguna validación.
9. Deploy en Vercel cuando el push llega a `main`.
10. Notificación a Slack si se realiza el deploy con éxito.