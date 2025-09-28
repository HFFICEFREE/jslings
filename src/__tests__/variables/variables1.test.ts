const { constVariable } = require('../../../exercises/variables/variables1.js');

describe("variables1", () => {
    it("variáveis const não devem ser mutadas", () => {
        expect(constVariable(2)).toBe(2);
    });
});
