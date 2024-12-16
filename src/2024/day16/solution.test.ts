import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 16 Solution (2024)', () => {
    const firstExample = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

    const secondExample = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

    it('should solve Part 1', () => {
        expect(solvePart1(firstExample)).toEqual(7036);
    });

    it('should solve Part 1 - example 2', () => {
        expect(solvePart1(secondExample)).toEqual(11048);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(85420);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(firstExample)).toEqual(45);
    });

    it('should solve Part 2 - example 2', () => {
        expect(solvePart2(secondExample)).toEqual(64);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(492);
    });
});
