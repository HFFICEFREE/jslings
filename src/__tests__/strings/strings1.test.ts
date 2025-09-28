const { uppercase } = require('../../../exercises/strings/strings1.js');

describe("strings1", () => {
    it("pode retornar string em maiúsculas", () => {
        expect(uppercase("I am a string")).toBe("I AM A STRING");
    });
});
