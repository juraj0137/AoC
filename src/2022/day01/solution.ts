export const solve = (input: string): number => {
    const numbers = input.split('\n').map(Number);
    return numbers.reduce((sum, num) => sum + num, 0); // Example: Sum all numbers
};
