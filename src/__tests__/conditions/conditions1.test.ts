const { animalSounds } = require('../../../exercises/conditions/conditions1.js');

describe("conditions1", () => {
    it("retorna os sons corretos dos animais", () => {
        expect(animalSounds('cat')).toBe('MEOW');
        expect(animalSounds('dog')).toBe('WOOF');
    });
});
