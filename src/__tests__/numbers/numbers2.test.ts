const { square } = require("../../../exercises/numbers/numbers2.js");

describe("numbers2", () => {
    it("pode elevar um número ao quadrado", () => {
        expect(square(2)).toBe(4);
    });
});
