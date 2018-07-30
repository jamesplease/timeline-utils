module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  testMatch: ['**/*.test.+(ts|tsx|js)'],
  testURL: 'http://localhost',
};
