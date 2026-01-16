import generateTokenHelper from '../../../../helpers/admin/auth/generateToken.helper.js';

describe('Unit testing generateTokenHelper function', () => {
  // Test case 01
  test('idx = 0 -> return empty string', () => {
    const result = generateTokenHelper(0);

    expect(result).toBe('');
    expect(result.length).toBe(0);
  });

  // Test case 02
  test('idx = 10 -> return string with length 10', () => {
    const result = generateTokenHelper(10);

    expect(typeof result).toBe('string');
    expect(result.length).toBe(10);
  });

  // Test case 03
  test('idx = 1 -> return string with length 1', () => {
    const result = generateTokenHelper(1);

    expect(typeof result).toBe('string');
    expect(result.length).toBe(1);
  });

  // Test case 04
  test('token only contains valid characters', () => {
    const result = generateTokenHelper(50);
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789';

    for (const char of result) {
      expect(validCharacters.includes(char)).toBe(true);
    }
  });

  // Test case 05
  test('idx < 0 -> return empty string', () => {
    const result = generateTokenHelper(-5);

    expect(result).toBe('');
  });

  // Test case 06
  test('idx is not a number -> return empty string', () => {
    const result = generateTokenHelper('abc');

    expect(result).toBe('');
  });

  // Test case 07
  test('same idx generates different tokens (random)', () => {
    const token1 = generateTokenHelper(20);
    const token2 = generateTokenHelper(20);

    expect(token1).not.toBe(token2);
  });
});
