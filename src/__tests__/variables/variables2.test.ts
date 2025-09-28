const { variableDeclaration } = require('../../../exercises/variables/variables2.js');

describe("variables2", () => {
    it("Variables2 deve compilar", () => {
        expect(variableDeclaration(2)).toBe(2);
    });
});
