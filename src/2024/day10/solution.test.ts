import {
    solvePart1,
    solvePart2,
    parseMap,
    findStartPoints,
    getNumberOfReachableEnds,
    getNumberOfUniquePaths,
} from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 10 Solution (2024)', () => {
    it('should find paths', () => {
        const map = parseMap(`0123
1234
8765
9876`);
        const starts = findStartPoints(map);
        const uniqueEnds = getNumberOfReachableEnds(starts[0], map);
        expect(uniqueEnds).toEqual(1);
    });

    it('should find paths', () => {
        const map = parseMap(`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`);
        const starts = findStartPoints(map);
        const uniqueEnds = getNumberOfReachableEnds(starts[0], map);
        expect(uniqueEnds).toEqual(2);
    });
    it('should find paths', () => {
        const map = parseMap(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);
        const starts = findStartPoints(map);
        const uniqueEnds = getNumberOfReachableEnds(starts[0], map);
        expect(uniqueEnds).toEqual(4);
    });
    it('should find paths', () => {
        const map = parseMap(`10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`);
        const starts = findStartPoints(map);
        const trailHeads = starts.map((start) =>
            getNumberOfReachableEnds(start, map),
        );
        expect(trailHeads).toEqual([1, 2]);
    });

    it('should find paths', () => {
        const map = parseMap(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`);
        const starts = findStartPoints(map);
        const trailHeads = starts.map((start) =>
            getNumberOfReachableEnds(start, map),
        );
        const sum = trailHeads.reduce((acc, curr) => acc + curr, 0);
        expect(sum).toEqual(36);
    });

    it('distinct trails', () => {
        const map = parseMap(`.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`);
        const starts = findStartPoints(map);
        const trailHeads = starts.map((start) =>
            getNumberOfUniquePaths(start, map),
        );
        const sum = trailHeads.reduce((acc, curr) => acc + curr, 0);
        expect(sum).toEqual(3);
    });
    it('distinct trails', () => {
        const map = parseMap(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);
        const starts = findStartPoints(map);
        const trailHeads = starts.map((start) =>
            getNumberOfUniquePaths(start, map),
        );
        const sum = trailHeads.reduce((acc, curr) => acc + curr, 0);
        expect(sum).toEqual(13);
    });
    it('distinct trails', () => {
        const map = parseMap(`012345
123456
234567
345678
4.6789
56789.`);
        const starts = findStartPoints(map);
        const trailHeads = starts.map((start) =>
            getNumberOfUniquePaths(start, map),
        );
        const sum = trailHeads.reduce((acc, curr) => acc + curr, 0);
        expect(sum).toEqual(227);
    });
    it('distinct trails', () => {
        const map = parseMap(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`);
        const starts = findStartPoints(map);
        const trailHeads = starts.map((start) =>
            getNumberOfUniquePaths(start, map),
        );
        const sum = trailHeads.reduce((acc, curr) => acc + curr, 0);
        expect(sum).toEqual(81);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(501);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(1017);
    });
});
