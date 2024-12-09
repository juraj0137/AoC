import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 9 Solution (2024)', () => {
    const input = `2333133121414131402`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(1928);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(6461289671426);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(2858);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(6488291456470);
    });
});
