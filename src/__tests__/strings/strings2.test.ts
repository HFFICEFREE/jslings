const { strlen } = require('../../../exercises/strings/strings2.js');

describe("strings2", () => {
    it("pode encontrar o comprimento da string", () => {
        expect(strlen("I am a string")).toBe(13);
    });
});
