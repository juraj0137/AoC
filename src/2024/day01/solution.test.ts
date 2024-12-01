import { solvePart1, solvePart2 } from './solution';

describe('Day 1 Solution (2024)', () => {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(11);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(31);
    });
});
