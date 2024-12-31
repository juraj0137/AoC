import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';
import { ThreeBitComputer } from './ThreeBitComputer';

const file = readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day 17 Solution (2024)', () => {
    const input = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

    describe('Instruction adv', () => {
        it('should divide A by 2^0', () => {
            const computer = new ThreeBitComputer({ a: 8, b: 0, c: 0 });
            computer.processInstruction(0, 0);
            expect(computer.registers.a).toEqual(8);
        });
        it('should divide A by 2^1', () => {
            const computer = new ThreeBitComputer({ a: 8, b: 0, c: 0 });
            computer.processInstruction(0, 1);
            expect(computer.registers.a).toEqual(4);
        });
        it('should divide A by 2^B', () => {
            const computer = new ThreeBitComputer({ a: 16, b: 3, c: 0 });
            computer.processInstruction(0, 5);
            expect(computer.registers.a).toEqual(2);
        });
    });

    describe('Instruction bxl', () => {
        it('should XOR B with 1', () => {
            const computer = new ThreeBitComputer({
                a: 0,
                b: parseInt('101', 2),
                c: 0,
            });
            computer.processInstruction(1, parseInt('001', 2));
            expect(computer.registers.b).toEqual(parseInt('100', 2));
        });
        it('should XOR B with 6', () => {
            const computer = new ThreeBitComputer({
                a: 0,
                b: parseInt('101', 2),
                c: 3,
            });
            computer.processInstruction(1, parseInt('111', 2));
            expect(computer.registers.b).toEqual(parseInt('010', 2));
        });
    });

    describe('Instruction bst', () => {
        it('should set B to 0', () => {
            const computer = new ThreeBitComputer({
                a: 0,
                b: 0,
                c: 0,
            });
            computer.processInstruction(2, 0);
            expect(computer.registers.b).toEqual(0);
        });
        it('should set B to 3', () => {
            const computer = new ThreeBitComputer({
                a: 0,
                b: 0,
                c: 0,
            });
            computer.processInstruction(2, 3);
            expect(computer.registers.b).toEqual(3);
        });
    });

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual('4,6,3,5,6,3,5,2,1,0');
    });

    it('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual('6,5,7,4,5,7,3,1,0');
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).not.toEqual(null);
    });

    it.skip('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).not.toEqual(null);
    });
});
