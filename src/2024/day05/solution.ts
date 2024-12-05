type Rules = Record<number, number[]>;

export const parseInput = (input: string) => {
    const [rulesInput, printBatchesInput] = input.split('\n\n');

    const rules = rulesInput.split('\n').reduce((acc, ruleInput) => {
        const [first, second] = ruleInput.split('|').map(Number);
        acc[first] = acc[first] || [];
        acc[first].push(second);
        return acc;
    }, {} as Rules);

    const printBatches = printBatchesInput
        .split('\n')
        .map((row) => row.split(',').map(Number));

    return { rules, printBatches };
};

export const hasCorrectOrder = (row: number[], rules: Rules) => {
    for (let i = 1; i < row.length; i++) {
        const current = row[i];
        for (let j = 0; j < i; j++) {
            const previous = row[j];
            if (!rules[previous]?.includes(current)) {
                return false;
            }
        }
    }
    return true;
};

export const fixIncorrectOrder = (row: number[], rules: Rules) => {
    return row.sort((a, b) => {
        return rules[a]?.includes(b) ? -1 : 1;
    });
};

const findMiddle = (row: number[]) => {
    return row[Math.floor(row.length / 2)];
};

export const solvePart1 = (input: string): any => {
    const { rules, printBatches } = parseInput(input);
    return printBatches
        .filter((batch) => hasCorrectOrder(batch, rules))
        .reduce((sum, batch) => sum + findMiddle(batch), 0);
};

export const solvePart2 = (input: string): any => {
    const { rules, printBatches } = parseInput(input);
    return printBatches
        .filter((batch) => !hasCorrectOrder(batch, rules))
        .map((batch) => fixIncorrectOrder(batch, rules))
        .reduce((sum, batch) => sum + findMiddle(batch), 0);
};
