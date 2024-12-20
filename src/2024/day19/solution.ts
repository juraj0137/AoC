type Memo = { [key: string]: number };

// function canMakeDesign(
//     design: string,
//     patterns: string[],
//     memo: Memo = {},
// ): boolean {
//     if (design === '') {
//         return true;
//     }
//
//     if (memo[design] !== undefined) {
//         return memo[design];
//     }
//
//     for (const pattern of patterns) {
//         if (design.startsWith(pattern)) {
//             const remaining = design.slice(pattern.length);
//             if (canMakeDesign(remaining, patterns, memo)) {
//                 memo[design] = true;
//                 return true;
//             }
//         }
//     }
//
//     memo[design] = false;
//     return false;
// }

// function countPossibleDesigns(designs: string[], patterns: string[]): number {
//     console.log(designs, patterns);
//     let count = 0;
//
//     for (const design of designs) {
//         if (canMakeDesign(design, patterns)) {
//             count++;
//         }
//     }
//
//     return count;
// }

function countWaysToMakeDesign(
    design: string,
    patterns: string[],
    memo: Memo = {},
): number {
    if (design === '') {
        return 1;
    }
    if (memo[design] !== undefined) {
        return memo[design];
    }

    let ways = 0;

    for (const pattern of patterns) {
        if (design.startsWith(pattern)) {
            const remaining = design.slice(pattern.length);
            ways += countWaysToMakeDesign(remaining, patterns, memo);
        }
    }

    memo[design] = ways; // Uloženie výsledku do memoizácie.
    return ways;
}

function countPossibleDesigns(designs: string[], patterns: string[]): number {
    console.log(designs, patterns);
    let count = 0;

    for (const design of designs) {
        if (countWaysToMakeDesign(design, patterns) > 0) {
            count++;
        }
    }

    return count;
}

function totalWays(designs: string[], patterns: string[]): number {
    let total = 0;

    for (const design of designs) {
        total += countWaysToMakeDesign(design, patterns);
    }

    return total;
}

const parseInput = (input: string): [string[], string[]] => {
    const [patterns, designs] = input.split('\n\n');
    console.log(patterns, designs);
    return [designs.split('\n'), patterns.split(',').map((p) => p.trim())];
};

export const solvePart1 = (input: string): any => {
    const [designs, patterns] = parseInput(input);
    return countPossibleDesigns(designs, patterns);
};

export const solvePart2 = (input: string): any => {
    const [designs, patterns] = parseInput(input);
    return totalWays(designs, patterns);
};
