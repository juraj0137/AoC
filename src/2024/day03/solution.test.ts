import { solvePart1, solvePart2 } from './solution';

describe('Day 3 Solution (2024)', () => {
    it('should solve Part 1', () => {
        const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
        expect(solvePart1(input)).toEqual(161);
    });

    it('should solve Part 2', () => {
        const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
        expect(solvePart2(input)).toEqual(48);
    });
});
