import { solvePart1, solvePart2 } from './solution';

describe('Day 4 Solution (2024)', () => {
    it('should solve Part 1', () => {
        const input = `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`;
        expect(solvePart1(input)).toEqual(18);
    });

    it('should solve Part 2', () => {
        const input = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;
        expect(solvePart2(input)).toEqual(9);
    });
});
