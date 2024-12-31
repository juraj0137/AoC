import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 14 Solution (2024)', () => {
    const input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

    it('should solve Part 1', () => {
        expect(solvePart1(input, 11, 7)).toEqual(12);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file, 101, 103)).toEqual(230435667);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(null);
    });
});
