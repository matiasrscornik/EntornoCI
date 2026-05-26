import { describe, expect, it } from 'vitest';
import { concatenateNumbers } from '../src/concatenate.js';

describe('concatenateNumbers', () => {
    it('concatena dos valores no vacíos', () => {
        expect(concatenateNumbers('12', '34')).toBe('1234');
    });

    it('rechaza valores vacíos', () => {
        expect(concatenateNumbers('', '34')).toBe('Se deben ingresar dos números válidos');
    });
});