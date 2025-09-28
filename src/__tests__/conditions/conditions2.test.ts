const { animalSoundsTernary } = require('../../../exercises/conditions/conditions2.js');

describe("conditions2", () => {
    it("retorna os sons corretos dos animais", () => {
        expect(animalSoundsTernary('cat')).toBe('MEOW');
        expect(animalSoundsTernary('dog')).toBe('WOOF');
    });
});
