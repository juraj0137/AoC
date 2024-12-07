const applyOperation = (a: number, b: number, op: string): number | null => {
    switch (op) {
        case '+':
            return a + b;
        case '*':
            return a * b;
        case '||':
            return Number(`${a}${b}`);
        default:
            throw null;
    }
};

const parseLine = (line: string) => {
    const [testValue, inputs] = line.split(': ');

    return {
        testValue: Number(testValue),
        inputs: inputs.split(' ').map(Number),
    };
};

export const evaluate = (
    testValue: number,
    inputs: number[],
    operations: string[] = ['+', '*'],
): number | null => {
    if (inputs.length < 2) {
        return null;
    }
    const [first, second, ...rest] = inputs;

    if (rest.length === 0) {
        for (const op of operations) {
            let result = applyOperation(first, second, op);
            if (testValue === result) {
                return result;
            }
        }
        return null;
    }

    for (const op of operations) {
        const newFirst = applyOperation(first, second, op);
        if (newFirst === null) {
            continue;
        }
        const result = evaluate(testValue, [newFirst, ...rest], operations);
        if (result === null) {
            continue;
        }
        return result;
    }

    return null;
};

export const solvePart1 = (input: string): any => {
    return input
        .split('\n')
        .map(parseLine)
        .reduce((acc, { testValue, inputs }) => {
            const result = evaluate(testValue, inputs, ['+', '*']);
            return acc + (result ?? 0);
        }, 0);
};

export const solvePart2 = (input: string): any => {
    return input
        .split('\n')
        .map(parseLine)
        .reduce((acc, { testValue, inputs }) => {
            const result = evaluate(testValue, inputs, ['+', '*', '||']);
            return acc + (result ?? 0);
        }, 0);
};
