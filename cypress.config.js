import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
    supportFile: false,
    specPattern: 'test/e2e/**/*.cy.{js,jsx,ts,tsx}',
    screenshotsFolder: 'test/e2e/screenshots',
    videosFolder: 'test/e2e/videos',
  },
  video: true,
});
