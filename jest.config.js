const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

module.exports = createJestConfig({
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^~components(.*)$": "<rootDir>/components$1",
        "^~hooks(.*)$": "<rootDir>/hooks$1",
        "^~mocks(.*)$": "<rootDir>/mocks$1",
        "^~tests(.*)$": "<rootDir>/tests$1",
        "^~utils(.*)$": "<rootDir>/utils$1",
        "^@theme$": "<rootDir>/theme.ts",
        "^@testing-library/jest-dom$": require.resolve('@testing-library/jest-dom')
    },
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/cypress/"],
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.ts",
        "<rootDir>/tests/setupTests.ts"
    ],
    moduleDirectories: ['node_modules', '<rootDir>'],
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
});