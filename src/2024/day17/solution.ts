import { ThreeBitComputer } from './ThreeBitComputer';

const parseInput = (input: string) => {
    const [registersInput, program] = input.split('\n\n');
    const registers = registersInput
        .split('\n')
        .map((line) => line.split(': ')[1])
        .map(Number);
    const instructions = program
        .replace('Program: ', '')
        .split(',')
        .map(Number);
    return { registers, instructions };
};

export const solvePart1 = (input: string): any => {
    const { registers, instructions } = parseInput(input);
    const computer = new ThreeBitComputer({
        a: registers[0],
        b: registers[1],
        c: registers[2],
    });
    return computer.runProgram(instructions);
};

function getCandidate(startFrom = 1): number {
    const transform = (a: number, b: number, c: number) => {
        b = a % 8;
        b = b ^ 5;
        c = Math.floor(a / 2 ** b);
        a = Math.floor(a / 8);
        b = b ^ 6;
        b = b ^ c;
        return [a, b, c];
    };

    for (let A = startFrom; ; A++) {
        let a = A;
        let b = 0;
        let c = 0;

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 2) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 4) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 1) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 5) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 7) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 5) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 0) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 3) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 1) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 6) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 4) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 3) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 5) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 5) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 !== 3) {
            continue;
        }

        [a, b, c] = transform(a, b, c);
        if (b % 8 === 0) {
            return A;
        }
    }
}

export const solvePart2 = (input: string): any => {
    const initialA = 1_00_000_000_000;
    // const initialA = 1;
    const candidates: number[] = [];
    for (let i = 1; i <= 5; i++) {
        const lastCandidate = candidates[candidates.length - 1] ?? initialA;
        candidates.push(getCandidate(lastCandidate + 1));
    }

    const { registers, instructions } = parseInput(`Register A: 59590048
Register B: 0
Register C: 0

Program: 2,4,1,5,7,5,0,3,1,6,4,3,5,5,3,0`);
    const program = instructions.join(',');
    for (let i = 0; i < candidates.length; i++) {
        const computer = new ThreeBitComputer({
            a: candidates[i],
            b: registers[1],
            c: registers[2],
        });
        const output = computer.runProgram(instructions);
        console.log(candidates[i], output, output.length, program.length);

        if (output == program) {
            return candidates[i];
        }
    }

    return null;
};
