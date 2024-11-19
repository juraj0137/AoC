import {
    solvePart1,
    solvePart2,
    evaluateRound,
    evaluateRoundForKnownResult,
} from './solution';

describe('Day 2 Solution (2022)', () => {
    it('should calculate score for a round', () => {
        expect(evaluateRound('A Y')).toEqual(8);
        expect(evaluateRound('B X')).toEqual(1);
        expect(evaluateRound('C Z')).toEqual(6);
    });

    it('should calculate score for a round when column B is the result', () => {
        expect(evaluateRoundForKnownResult('A Y')).toEqual(4);
        expect(evaluateRoundForKnownResult('B X')).toEqual(1);
        expect(evaluateRoundForKnownResult('C Z')).toEqual(7);
    });

    const input = `A Y
B X
C Z`;

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(15);
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(12);
    });
});
