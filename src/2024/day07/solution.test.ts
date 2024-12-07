import { solvePart1, solvePart2, evaluate } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const OPERATIONS_1 = ['+', '*'];
const OPERATIONS_2 = ['+', '*', '||'];

describe('Day 7 Solution (2024)', () => {
    const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

    describe('evaluate2', () => {
        it('should return test value #1', () => {
            expect(evaluate(190, [10, 19], OPERATIONS_1)).toBe(190);
            expect(evaluate(190, [10, 19], OPERATIONS_2)).toBe(190);
        });

        it('should return test value #2', () => {
            expect(evaluate(3267, [81, 40, 27], OPERATIONS_1)).toBe(3267);
            expect(evaluate(3267, [81, 40, 27], OPERATIONS_2)).toBe(3267);
        });

        it('should return test value #3', () => {
            expect(evaluate(292, [11, 6, 16, 20], OPERATIONS_1)).toBe(292);
            expect(evaluate(292, [11, 6, 16, 20], OPERATIONS_2)).toBe(292);
        });

        it('should return test value #4', () => {
            expect(evaluate(83, [17, 5], OPERATIONS_1)).toBe(null);
            expect(evaluate(83, [17, 5], OPERATIONS_2)).toBe(null);
        });

        it('should return test value #5', () => {
            expect(evaluate(156, [15, 6], OPERATIONS_2)).toBe(156);
        });

        it('should return test value #6', () => {
            expect(evaluate(7290, [6, 8, 6, 15], OPERATIONS_2)).toBe(7290);
        });

        it('should return test value #7', () => {
            expect(evaluate(192, [17, 8, 14], OPERATIONS_2)).toBe(192);
        });
    });

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(3749);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(11387);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(1038838357795);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(254136560217241);
    });
});
