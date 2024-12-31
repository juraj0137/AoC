import { addVectors } from '../../Vector';

type Position = [number, number];

type Grid = string[][];

const initializeGrid = (size: number): Grid => {
    return Array.from({ length: size }, () => Array(size).fill('.'));
};

const simulateFallingBytes = (grid: Grid, bytes: Position[]): void => {
    for (const [x, y] of bytes) {
        grid[y][x] = '#';
    }
};

const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

const isWithinBounds = (grid: Grid, position: Position): boolean => {
    const [x, y] = position;
    return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
};

const findMinimumStepsToEnd = (
    grid: Grid,
    start: Position,
    end: Position,
): number => {
    const queue: [Position, number][] = [[start, 0]];
    const visited = new Set<string>();
    visited.add(start.join(','));

    while (queue.length) {
        const [current, steps] = queue.shift()!;

        for (const direction of directions) {
            const nextPosition: Position = addVectors(current, direction);
            const nextPositionKey = nextPosition.join(',');

            if (nextPositionKey === end.join(',')) {
                return steps + 1;
            }

            if (
                isWithinBounds(grid, nextPosition) &&
                !visited.has(nextPositionKey) &&
                grid[nextPosition[1]]?.[nextPosition[0]] !== '#'
            ) {
                visited.add(nextPositionKey);
                queue.push([nextPosition, steps + 1]);
            }
        }
    }

    return -1;
};

export const solvePart1 = (
    input: string,
    size = 71,
    numberOfBytes = 1024,
): any => {
    const grid = initializeGrid(size);
    const bytes = input
        .split('\n')
        .map((line) => line.split(',').map(Number) as Position)
        .slice(0, numberOfBytes);
    simulateFallingBytes(grid, bytes);

    return findMinimumStepsToEnd(grid, [0, 0], [size - 1, size - 1]);
};

export const solvePart2 = (input: string, size = 71): any => {
    const grid = initializeGrid(size);
    const bytes = input
        .split('\n')
        .map((line) => line.split(',').map(Number) as Position);

    let lastInsertedByte: Position | undefined = undefined;
    while (findMinimumStepsToEnd(grid, [0, 0], [size - 1, size - 1]) !== -1) {
        lastInsertedByte = bytes.shift();
        if (!lastInsertedByte) {
            break;
        }
        simulateFallingBytes(grid, [lastInsertedByte]);
    }
    return lastInsertedByte?.join(',');
};
