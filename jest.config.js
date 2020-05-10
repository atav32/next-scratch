module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['<rootDir>tests/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};
