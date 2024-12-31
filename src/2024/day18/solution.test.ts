import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 18 Solution (2024)', () => {
    const input = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

    it('should solve Part 1', () => {
        expect(solvePart1(input, 7, 12)).toEqual(22);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(252);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input, 7)).toEqual(`6,1`);
    });

    it.skip('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual('5,60');
    });
});
