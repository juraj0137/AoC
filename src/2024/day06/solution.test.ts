import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 6 Solution (2024)', () => {
    const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(41);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(6);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(4580);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(1480);
    });
});
