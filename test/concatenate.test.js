import { describe, expect, it } from 'vitest';
import { concatenateNumbers } from '../src/concatenate.js';

describe('concatenateNumbers', () => {
  const invalidMessage = 'Se deben ingresar dos numeros validos';

  it('concatena dos numeros validos', () => {
    expect(concatenateNumbers('12', '34')).toBe('1234');
  });

  it('conserva los ceros iniciales', () => {
    expect(concatenateNumbers('01', '02')).toBe('0102');
  });

  it('ignora espacios alrededor de los numeros', () => {
    expect(concatenateNumbers(' 12 ', ' 34 ')).toBe('1234');
  });

  it.each([
    ['', '34'],
    ['12', ''],
    ['hola', '34'],
    ['12', 'mundo'],
    ['12abc', '34'],
    ['12.5', '34'],
    ['-12', '34'],
    ['   ', '34'],
  ])('rechaza entradas invalidas: %j y %j', (num1, num2) => {
    expect(concatenateNumbers(num1, num2)).toBe(invalidMessage);
  });

  it('acepta numeros enteros (no strings)', () => {
    expect(concatenateNumbers(12, 34)).toBe('1234');
  });

  it('rechaza null', () => {
    expect(concatenateNumbers(null, '34')).toBe(invalidMessage);
  });

  it('rechaza undefined', () => {
    expect(concatenateNumbers(undefined, '34')).toBe(invalidMessage);
  });

  it('siempre retorna string', () => {
    expect(typeof concatenateNumbers('1', '2')).toBe('string');
    expect(typeof concatenateNumbers('a', 'b')).toBe('string');
  });

  it('concatena numeros largos', () => {
    expect(concatenateNumbers('999999999', '000000001')).toBe('999999999000000001');
  });
});
