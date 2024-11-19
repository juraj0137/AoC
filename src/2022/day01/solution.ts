const getCaloriesPerElf = (input: string): number[] => {
    return input
        .split('\n\n')
        .map((elf) =>
            elf.split('\n').reduce((sum, val) => sum + Number(val), 0),
        );
};

const getElfWithMostCalories = (input: string): number => {
    return Math.max(...getCaloriesPerElf(input));
};

const getTopThreeMostCalories = (input: string): any => {
    return getCaloriesPerElf(input)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, b) => a + b, 0);
};

export const solvePart1 = (input: string): any => {
    return getElfWithMostCalories(input);
};

export const solvePart2 = (input: string): any => {
    return getTopThreeMostCalories(input);
};
