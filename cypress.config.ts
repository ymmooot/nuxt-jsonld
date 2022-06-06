import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    projectId: '8v9ivg',
    baseUrl: 'http://localhost:3000',
  },
  defaultCommandTimeout: 6000,
});
