import { expect } from 'vitest';
import { solvePart1, solvePart2, findRegions } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 12 Solution (2024)', () => {
    const input = `AAAA
BBCD
BBCC
EEEC`;

    describe('findRegions', () => {
        it('should return regions with area and perimeter', () => {
            const result = findRegions(`AAAA
BBCD
BBCC
EEEC`);

            expect(result).toEqual([
                expect.objectContaining({ area: 4, perimeter: 10, cell: 'A' }),
                expect.objectContaining({ area: 4, perimeter: 8, cell: 'B' }),
                expect.objectContaining({ area: 4, perimeter: 10, cell: 'C' }),
                expect.objectContaining({ area: 1, perimeter: 4, cell: 'D' }),
                expect.objectContaining({ area: 3, perimeter: 8, cell: 'E' }),
            ]);
        });

        it('should return regions with area and perimeter', () => {
            const result = findRegions(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`);

            expect(result).toEqual([
                expect.objectContaining({ area: 21, perimeter: 36, cell: 'O' }),
                expect.objectContaining({ area: 1, perimeter: 4, cell: 'X' }),
                expect.objectContaining({ area: 1, perimeter: 4, cell: 'X' }),
                expect.objectContaining({ area: 1, perimeter: 4, cell: 'X' }),
                expect.objectContaining({ area: 1, perimeter: 4, cell: 'X' }),
            ]);
        });

        it('should return regions with area and perimeter', () => {
            const result = findRegions(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`);

            expect(result).toEqual([
                expect.objectContaining({ area: 12, perimeter: 18, cell: 'R' }),
                expect.objectContaining({ area: 4, perimeter: 8, cell: 'I' }),
                expect.objectContaining({ area: 14, perimeter: 28, cell: 'C' }),
                expect.objectContaining({ area: 10, perimeter: 18, cell: 'F' }),
                expect.objectContaining({ area: 13, perimeter: 20, cell: 'V' }),
                expect.objectContaining({ area: 11, perimeter: 20, cell: 'J' }),
                expect.objectContaining({ area: 1, perimeter: 4, cell: 'C' }),
                expect.objectContaining({ area: 13, perimeter: 18, cell: 'E' }),
                expect.objectContaining({ area: 14, perimeter: 22, cell: 'I' }),
                expect.objectContaining({ area: 5, perimeter: 12, cell: 'M' }),
                expect.objectContaining({ area: 3, perimeter: 8, cell: 'S' }),
            ]);
        });

        it('should return regions with corners', () => {
            const result = findRegions(`AAAA
BBCD
BBCC
EEEC`);
            expect(result).toEqual([
                expect.objectContaining({ corners: 4, cell: 'A' }),
                expect.objectContaining({ corners: 4, cell: 'B' }),
                expect.objectContaining({ corners: 8, cell: 'C' }),
                expect.objectContaining({ corners: 4, cell: 'D' }),
                expect.objectContaining({ corners: 4, cell: 'E' }),
            ]);
        });
    });

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(140);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(1387004);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(80);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(844198);
    });
});
