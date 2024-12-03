const parseMulInstruction = (instruction: string): [number, number] => {
    const [_, a, b] = instruction.match(/mul\((\d{1,3}),(\d{1,3})\)/) || [];
    return [parseInt(a, 10), parseInt(b, 10)];
};

export const solvePart1 = (input: string): any => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    return input
        .match(regex)
        ?.map(parseMulInstruction)
        .reduce((acc, [a, b]) => acc + a * b, 0);
};

export const solvePart2 = (input: string): any => {
    /*
    ?: is for non capturing group
    ?= is for positive look ahead
    ?! is for negative look ahead
    ?<= is for positive look behind
    ?<! is for negative look behind
    */
    const parts = input.split(/(?<=mul\(\d{1,3},\d{1,3}\))/g);

    let enabled = true;
    return parts.reduce((acc, part) => {
        if (part.includes(`don't()`)) {
            enabled = false;
        }
        if (part.includes('do()')) {
            enabled = true;
        }
        const [a, b] = parseMulInstruction(part);
        if (!enabled || isNaN(a) || isNaN(b)) {
            return acc;
        }
        return acc + a * b;
    }, 0);
};
