// import { defineConfig, mergeConfig } from 'vitest/config'
// import viteConfig from './vite.config'
//
// export default mergeConfig(
//   viteConfig,
//   defineConfig({
//     test: {
//       globals: true,
//       environment: 'jsdom',
//       setupFiles: './src/vitest-setup.ts',
//       coverage: {
//         provider: 'v8'
//       },
//       typecheck: {
//         tsconfig: './tsconfig.vitest.json'
//       }
//     }
//   })
// )
import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        'e2e/**',
        '**/__tests__/e2e/**', // Add this line
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
