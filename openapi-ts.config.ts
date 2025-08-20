import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://localhost:8081/v3/api-docs',
  output: {
    path: './src/infrastructure/api',
    format: 'prettier',
    lint: 'eslint',
  },
  plugins: [
    '@hey-api/schemas',
    {
      name: '@hey-api/transformers',
      dates: true,
    },
    {
      name: '@hey-api/typescript',
      enums: 'javascript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
})
