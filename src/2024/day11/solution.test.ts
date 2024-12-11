import { solvePart1, solvePart2, processStone } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 11 Solution (2024)', () => {
    const input = `125 17`;

    describe('processStone', () => {
        it('0 becomes 1', () => {
            expect(processStone(0)).toEqual([1]);
        });

        it('stone with even digits should split into two number', () => {
            expect(processStone(1234)).toEqual([12, 34]);
        });

        it('stone with odd digits should be multiplied by 2024', () => {
            expect(processStone(123)).toEqual([123 * 2024]);
        });
    });

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(55312);
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(186175);
    });

    it('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(220566831337810);
    });
});
