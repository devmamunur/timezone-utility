// jest.config.js

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts$',  // Include the test folder
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    }
};