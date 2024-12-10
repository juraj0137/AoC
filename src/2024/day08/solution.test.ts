import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 8 Solution (2024)', () => {
    const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(14);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(379);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(34);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(1339);
    });
});
