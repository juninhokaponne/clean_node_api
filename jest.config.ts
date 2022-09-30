export default {
  roots: ['<rootDir>/src'],
  collectCoverage: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
