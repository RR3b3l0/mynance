module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./src/testing/setupJest.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 30000,
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
