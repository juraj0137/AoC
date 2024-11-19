import { solvePart1, solvePart2 } from './solution';

describe('Day 1 Solution (2022)', () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(24000);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(45000);
    });
});
