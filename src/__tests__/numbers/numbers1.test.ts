const { sum } = require('../../../exercises/numbers/numbers1.js');

describe("numbers1", () => {
    it("pode somar dois números", () => {
        expect(sum(2, 2)).toBe(4);
    });
});
