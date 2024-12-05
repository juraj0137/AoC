import {
    solvePart1,
    solvePart2,
    parseInput,
    hasCorrectOrder,
    fixIncorrectOrder,
} from './solution';

describe('Day 5 Solution (2024)', () => {
    const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

    describe('hasCorrectOrder', () => {
        it('should return true when row is ordered correctly', () => {
            const { rules, printBatches } = parseInput(input);
            expect(hasCorrectOrder(printBatches[0], rules)).toEqual(true);
            expect(hasCorrectOrder(printBatches[1], rules)).toEqual(true);
            expect(hasCorrectOrder(printBatches[2], rules)).toEqual(true);
            expect(hasCorrectOrder(printBatches[3], rules)).toEqual(false);
            expect(hasCorrectOrder(printBatches[4], rules)).toEqual(false);
            expect(hasCorrectOrder(printBatches[5], rules)).toEqual(false);
        });
    });

    describe('fixIncorrectOrder', () => {
        it('should return correct order', () => {
            const { rules, printBatches } = parseInput(input);
            expect(fixIncorrectOrder(printBatches[3], rules)).toEqual([
                97, 75, 47, 61, 53,
            ]);
        });
    });

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(143);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(123);
    });
});
