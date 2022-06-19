module.exports = {
  testIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'], // ignora o node_modules e a pasta .next (building components)
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': '<rootDir>/node_modules/babel-jest', // Configura o babel pegando todos os arquivos js, jsx, ts, tsx
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'], // Definindo o arquivo de setup para os testes

  testEnvironment: 'jsdom', // Definindo o ambiente de teste
}
