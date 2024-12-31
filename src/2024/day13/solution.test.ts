import {
    solvePart1,
    solvePart2,
    parseInput,
    findMinimumCost,
} from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 13 Solution (2024)', () => {
    const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

    it('should return number of tokens', () => {
        const tmp = parseInput(`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400`);

        expect(findMinimumCost(tmp[0])).toEqual(280);
    });

    it('should return number of tokens', () => {
        const tmp = parseInput(`Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450`);

        expect(findMinimumCost(tmp[0])).toEqual(200);
    });

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(480);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(30973);
    });

    it.skip('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(480);
    });

    it.skip('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(null);
    });
});
