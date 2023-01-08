import { getNameInitials } from '../string-utils';

describe('stringManipulation', () => {
  describe('getNameInitials', () => {
    test('given firstname lastname, return valid initials', () => {
      // Arrange
      const name: string = 'John Doe';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given firstname lastname inconsistently (lower case), return valid initials', () => {
      // Arrange
      const name: string = 'john doe';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given firstname lastname inconsistently (bad spacing), return valid initials', () => {
      // Arrange
      const name: string = ' John   Doe ';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given firstname lastname inconsistently (1 name), return valid initials', () => {
      // Arrange
      const name: string = 'John';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('J');
    });

    test('given firstname lastname inconsistently (3 names), return valid initials', () => {
      // Arrange
      const name: string = 'John Doe Mary';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given firstname lastname inconsistently (invalid characters), return valid initials', () => {
      // Arrange
      const name: string = "$$John )Do'e Mary";

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given firstname lastname inconsistently (combination), return valid initials (1)', () => {
      // Arrange
      const name: string = ' . john Doe  mary ';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given firstname lastname inconsistently (combination), return valid initials (2)', () => {
      // Arrange
      const name: string = " .  joh&&n Doe  m'ary ";

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('JD');
    });

    test('given pure invalid input, return null (1)', () => {
      // Arrange
      const name: string = ' . ';

      // Act
      const initials: string = getNameInitials(name);

      // Assert
      expect(initials).toBe('');
    });
  });
});
