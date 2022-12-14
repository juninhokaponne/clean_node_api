export default {
  roots: ['<rootDir>/src'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
