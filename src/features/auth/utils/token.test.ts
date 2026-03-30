import { describe, expect, it } from 'vitest';
import { isValidStoredToken } from './token';

describe('isValidStoredToken', () => {
  it('returns false for null and invalid placeholders', () => {
    expect(isValidStoredToken(null)).toBe(false);
    expect(isValidStoredToken('undefined')).toBe(false);
    expect(isValidStoredToken('null')).toBe(false);
  });

  it('returns true for a regular JWT-like token string', () => {
    expect(isValidStoredToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.payload')).toBe(true);
  });
});
