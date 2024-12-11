import { Coordinates } from '../../CoordinatesMap';
import { addVectors } from '../../Vector';

const DIRECTIONS: Coordinates[] = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
];

export const parseMap = (input: string) => {
    return input
        .split('\n')
        .map((line) =>
            line.split('').map((char) => (char === '.' ? -1 : Number(char))),
        );
};

export const findStartPoints = (map: number[][]): Coordinates[] => {
    const startPoints: Coordinates[] = [];
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 0) {
                startPoints.push([row, col]);
            }
        }
    }
    return startPoints;
};

const isWithinMap = ([row, col]: Coordinates, map: number[][]) => {
    return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
};

const isValidStep = (current: number, next: number): boolean => {
    return next !== -1 && next - current === 1;
};

export const findPaths = (
    startCoordinates: Coordinates,
    map: number[][],
    currentPath: Coordinates[] = [],
): Coordinates[][] => {
    const paths: Coordinates[][] = [];
    const start = map[startCoordinates[0]][startCoordinates[1]];

    DIRECTIONS.forEach((direction) => {
        const nextCoordinates = addVectors(startCoordinates, direction);
        if (!isWithinMap(nextCoordinates, map)) {
            return;
        }

        const nextPoint = map[nextCoordinates[0]][nextCoordinates[1]];

        if (nextPoint === 9 && isValidStep(start, nextPoint)) {
            paths.push([...currentPath, startCoordinates, nextCoordinates]);
            return;
        }

        if (isValidStep(start, nextPoint)) {
            const nextPaths = findPaths(nextCoordinates, map, [
                ...currentPath,
                startCoordinates,
            ]);
            paths.push(...nextPaths);
        }
    });

    return paths;
};

export const getNumberOfReachableEnds = (
    start: Coordinates,
    map: number[][],
): number => {
    const uniqueEnds = findPaths(start, map)
        .map((path) => path[path.length - 1])
        .reduce((acc, end) => {
            acc.add(end.join(','));
            return acc;
        }, new Set<string>());
    return uniqueEnds.size;
};

export const getNumberOfUniquePaths = (
    start: Coordinates,
    map: number[][],
): number => {
    const uniquePaths = findPaths(start, map).reduce((acc, path) => {
        acc.add(path.map((point) => point.join(',')).join('->'));
        return acc;
    }, new Set<string>());
    return uniquePaths.size;
};

export const solvePart1 = (input: string): any => {
    const map = parseMap(input);
    return findStartPoints(map)
        .map((start) => getNumberOfReachableEnds(start, map))
        .reduce((acc, curr) => acc + curr, 0);
};

export const solvePart2 = (input: string): any => {
    const map = parseMap(input);
    return findStartPoints(map)
        .map((start) => getNumberOfUniquePaths(start, map))
        .reduce((acc, curr) => acc + curr, 0);
};
