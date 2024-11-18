import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // Enable global test functions
        // environment: 'node',
        // setupFiles: './vitest.setup.ts', // Specify the setup file
    },
});
