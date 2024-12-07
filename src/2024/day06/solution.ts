import { Coordinates, CoordinatesMap } from '../../CoordinatesMap';

const STARTING_POSITION = '^';
const OBSTACLE = '#';
const ADDITIONAL_OBSTACLE = 'o';
const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

// [ row ][ col ]
const parseInput = (input: string): string[][] =>
    input.split('\n').map((line) => line.split(''));

const isObstacle = (map: string[][], [row, column]: Coordinates): boolean =>
    map[row][column] === OBSTACLE || map[row][column] === ADDITIONAL_OBSTACLE;

const isInMap = (map: string[][], [row, column]: Coordinates): boolean =>
    row >= 0 && row < map.length && column >= 0 && column < map[0].length;

const getNextPosition = (
    [row, col]: Coordinates,
    direction: number,
): Coordinates => {
    switch (direction) {
        case DIRECTIONS.UP:
            return [row - 1, col];
        case DIRECTIONS.RIGHT:
            return [row, col + 1];
        case DIRECTIONS.DOWN:
            return [row + 1, col];
        case DIRECTIONS.LEFT:
            return [row, col - 1];
        default:
            throw new Error(`Unknown direction: ${direction}`);
    }
};

const findInitialPosition = (map: string[][]): Coordinates => {
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[0].length; column++) {
            if (map[row][column] === STARTING_POSITION) {
                return [row, column];
            }
        }
    }
    throw new Error('Starting position not found');
};

const turnRight = (direction: number): number => {
    return (direction + 1) % 4;
};

export const solvePart1 = (input: string): any => {
    const map = parseInput(input);
    const visited = new Set<string>();

    let direction = DIRECTIONS.UP;
    let currentPosition = findInitialPosition(map);

    while (isInMap(map, currentPosition)) {
        visited.add(currentPosition.join(','));
        let nextPosition = getNextPosition(currentPosition, direction);
        if (!isInMap(map, nextPosition)) {
            // we found the way out
            break;
        }

        if (isObstacle(map, nextPosition)) {
            direction = turnRight(direction);
            nextPosition = getNextPosition(currentPosition, direction);
        }

        currentPosition = nextPosition;
    }
    return visited.size;
};

export const solvePart2 = (input: string): any => {
    const field = parseInput(input);
    const initialPosition = findInitialPosition(field);

    let count = 0;

    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[0].length; col++) {
            if (field[row][col] !== '.') {
                // skip place where we cannot place obstacle
                continue;
            }
            const startPosition = initialPosition;

            // place obstacle
            field[row][col] = ADDITIONAL_OBSTACLE;

            let direction = DIRECTIONS.UP;
            let currentPosition = startPosition;

            const visitedSet = new CoordinatesMap<number>();
            visitedSet.set(startPosition, direction);

            while (true) {
                let candidatePosition = getNextPosition(
                    currentPosition,
                    direction,
                );

                if (!isInMap(field, candidatePosition)) {
                    // we found the way out
                    break;
                }

                if (isObstacle(field, candidatePosition)) {
                    direction = turnRight(direction);
                    continue;
                }
                if (visitedSet.get(candidatePosition) === direction) {
                    // we entered loop
                    count++;
                    break;
                }

                currentPosition = candidatePosition;
                visitedSet.set(currentPosition, direction);
            }
            field[row][col] = '.';
        }
    }

    return count;
};
