import { solve } from './solution';

describe('Day 01 Solution (2023)', () => {
    it('should solve the example input', () => {
        const input = `1\n2\n3\n4`;
        expect(solve(input)).toBe(10); // 1 + 2 + 3 + 4 = 10
    });
});
