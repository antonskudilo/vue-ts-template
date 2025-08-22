export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: "tsconfig.jest.json"
      },
    ],
    '.*\\.vue$': '@vue/vue3-jest'
  },
  testMatch: [
    "**/tests/components/**/*.spec.ts",
    "**/tests/integration/**/*.spec.ts",
    "**/tests/unit/**/*.spec.ts",
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  moduleNameMapper: {
    "^@/config/env$": "<rootDir>/src/config/env.jest.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@views/(.*)$": "<rootDir>/src/views/$1",
    '^@vue/test-utils':
      '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
  }
};
