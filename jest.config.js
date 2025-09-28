// Para uma explicação detalhada sobre cada propriedade de configuração, visite:
// https://jestjs.io/docs/en/configuration.html

export default {
    // Um preset que é usado como base para a configuração do Jest
    preset: "ts-jest",
    // O ambiente de teste que será usado para testes
    testEnvironment: "node",

    // Um array de padrões glob indicando um conjunto de arquivos para os quais informações de cobertura devem ser coletadas
    collectCoverageFrom: ["src/**/!(*.d).{js,jsx,ts,tsx}"],
    // Um array de strings de padrão regexp usadas para pular a coleta de cobertura
    coveragePathIgnorePatterns: ["/node_modules/"],

    // Escrever arquivos lcov apenas em CIs
    // Uma lista de nomes de repórteres que o Jest usa ao escrever relatórios de cobertura
    coverageReporters: ["text"].concat(process.env.CI ? "json" : []),
    // Use esta opção de configuração para adicionar repórteres personalizados ao Jest
    reporters: ["default"].concat(
        process.env.CI
            ? [
                  [
                      "jest-junit",
                      {
                          outputDirectory: "./test-reports/junit",
                      },
                  ],
              ]
            : [],
    ),
};
