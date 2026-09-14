import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['dist/**', 'node_modules/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            include: ['src/**/*.ts'],
            exclude: ['src/generated/**', 'src/index.ts'],
            thresholds: {
                lines: 95,
                functions: 95,
                branches: 90,
                statements: 95,
            },
        },
    },
});
