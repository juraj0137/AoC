import { solvePart1, solvePart2, isReportSafeWithOneError } from './solution';

describe('Day 2 Solution (2024)', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`; // Add example input

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(2);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(4);
    });

    it('should return correct value for report', () => {
        expect(isReportSafeWithOneError('7 6 4 2 1')).toBe(true);
        expect(isReportSafeWithOneError('1 2 7 8 9')).toBe(false);
        expect(isReportSafeWithOneError('9 7 6 2 1')).toBe(false);
        expect(isReportSafeWithOneError('1 3 2 4 5')).toBe(true);
        expect(isReportSafeWithOneError('8 6 4 4 1')).toBe(true);
        expect(isReportSafeWithOneError('1 3 6 7 9')).toBe(true);
    });
});
