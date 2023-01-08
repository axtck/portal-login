import { generateHexColor } from '../string-utils';

describe('generators', () => {
  describe('generateHexColors', () => {
    it('should return a hex color', () => {
      // Arrange
      const hexRegex: RegExp = new RegExp(/#[0-9A-Fa-f]{6}/, 'g');

      // Act
      const hexColor: string = generateHexColor();

      // Assert
      expect(hexColor.charAt(0)).toBe('#');
      expect(hexColor.length).toBe(7);
      expect(hexColor).toMatch(hexRegex);
    });
  });
});
