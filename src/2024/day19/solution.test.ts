import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 19 Solution (2024)', () => {
    const input = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(6);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(317);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(16);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(883443544805484);
    });
});
