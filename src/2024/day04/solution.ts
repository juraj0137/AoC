const DIRECTIONS = [
    // [row, col]
    [0, 1], // right
    [1, 1], // down-right
    [1, 0], // down
    [1, -1], // down-left
    [0, -1], // left
    [-1, -1], // left-ip
    [-1, 0], // up
    [-1, 1], // up-right
];

const isWithinGrid = (grid: string[][], row: number, col: number) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

const searchWord = (
    grid: string[][],
    word: string,
    start: number[],
    direction: number[],
) => {
    const [row, col] = start;

    for (let i = 0; i < word.length; i++) {
        const newRow = row + i * direction[0];
        const newCol = col + i * direction[1];

        if (!isWithinGrid(grid, newRow, newCol)) {
            return false;
        }

        if (grid[newRow][newCol] !== word[i]) {
            return false;
        }
    }

    return true;
};

const getWordCount = (grid: string[][], word: string) => {
    let count = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            for (const direction of DIRECTIONS) {
                if (searchWord(grid, word, [row, col], direction)) {
                    count++;
                }
            }
        }
    }

    return count;
};

const getXCount = (grid: string[][], word: string) => {
    let count = 0;
    const downRight = [1, 1];
    const upRight = [-1, 1];
    const upLeft = [-1, -1];
    const downLeft = [1, -1];

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            /* X S
                A
               X S */
            if (
                searchWord(grid, word, [row, col], downRight) &&
                searchWord(grid, word, [row + 2, col], upRight)
            ) {
                count++;
            }

            /* S S
                A
               M M */
            if (
                searchWord(grid, word, [row, col], upRight) &&
                searchWord(grid, word, [row, col + 2], upLeft)
            ) {
                count++;
            }

            /* S M
                A
               S M */
            if (
                searchWord(grid, word, [row, col], downLeft) &&
                searchWord(grid, word, [row + 2, col], upLeft)
            ) {
                count++;
            }

            /* M M
                A
               S S */
            if (
                searchWord(grid, word, [row, col], downRight) &&
                searchWord(grid, word, [row, col + 2], downLeft)
            ) {
                count++;
            }
        }
    }

    return count;
};

const parseGrid = (input: string) => {
    return input.split('\n').map((line) => line.split(''));
};

export const solvePart1 = (input: string): any => {
    return getWordCount(parseGrid(input), 'XMAS');
};

export const solvePart2 = (input: string): any => {
    return getXCount(parseGrid(input), 'MAS');
};
