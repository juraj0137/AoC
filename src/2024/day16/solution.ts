import { dijkstra, Graph, Path } from './dijkstra';

const directions = {
    N: { dx: 0, dy: -1 },
    E: { dx: 1, dy: 0 },
    S: { dx: 0, dy: 1 },
    W: { dx: -1, dy: 0 },
};
type Direction = keyof typeof directions;

const STEP_COST = 1;
const TURN_COST = 1000;

const turnLeft = (direction: Direction): Direction => {
    switch (direction) {
        case 'N':
            return 'W';
        case 'E':
            return 'N';
        case 'S':
            return 'E';
        case 'W':
            return 'S';
    }
};

const findStart = (grid: string[][]): [number, number] | undefined => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') {
                return [x, y];
            }
        }
    }
    return undefined;
};

const findEnd = (grid: string[][]): [number, number] | undefined => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'E') {
                return [x, y];
            }
        }
    }
    return undefined;
};

const parseInputToGraph = (grid: string[][], start: [number, number]) => {
    const toBeProcessed: Array<[number, number, Direction]> = [
        [start[0], start[1], 'E'],
    ];

    const nodes: Graph = new Map();

    while (toBeProcessed.length > 0) {
        const [x, y, direction] = toBeProcessed.shift()!;
        const currentKey = `${x},${y},${direction}`;
        if (nodes.has(currentKey)) {
            continue;
        }
        nodes.set(currentKey, new Map());

        const { dx, dy } = directions[direction];
        const [nx, ny] = [x + dx, y + dy];

        if (grid[ny]?.[nx] !== '#') {
            toBeProcessed.push([nx, ny, direction]);
            nodes.get(currentKey)!.set(`${nx},${ny},${direction}`, STEP_COST);
        }

        const left = turnLeft(direction);
        const { dx: leftDx, dy: leftDy } = directions[left];
        if (grid[y + leftDy]?.[x + leftDx] !== '#') {
            toBeProcessed.push([x, y, left]);
            nodes.get(currentKey)!.set(`${x},${y},${left}`, TURN_COST);
        }

        const opposite = turnLeft(left);
        const { dx: oppositeDx, dy: oppositeDy } = directions[opposite];
        if (grid[y + oppositeDy]?.[x + oppositeDx] !== '#') {
            toBeProcessed.push([x, y, opposite]);
            nodes.get(currentKey)!.set(`${x},${y},${opposite}`, 2 * TURN_COST);
        }

        const right = turnLeft(opposite);
        const { dx: rightDx, dy: rightDy } = directions[right];
        if (grid[y + rightDy]?.[x + rightDx] !== '#') {
            toBeProcessed.push([x, y, right]);
            nodes.get(currentKey)!.set(`${x},${y},${right}`, TURN_COST);
        }
    }

    return nodes;
};

const parseInput = (input: string) => {
    const grid = input.split('\n').map((row) => row.split(''));

    const start = findStart(grid);
    const end = findEnd(grid);
    if (!start || !end) {
        throw new Error('Start or end not found');
    }

    const graph = parseInputToGraph(grid, start);
    return { start, end, graph };
};

export const solvePart1 = (input: string): any => {
    const { start, end, graph } = parseInput(input);

    const startNode = `${start[0]},${start[1]},E`;
    const { distances } = dijkstra(graph, startNode);

    let shortestDistanceToEnd = Infinity;
    distances.forEach((distance, node) => {
        if (node.startsWith(`${end[0]},${end[1]},`)) {
            if (!shortestDistanceToEnd || distance < shortestDistanceToEnd) {
                shortestDistanceToEnd = distance;
            }
        }
    });

    return shortestDistanceToEnd;
};

export const solvePart2 = (input: string): any => {
    const { start, end, graph } = parseInput(input);

    const startNode = `${start[0]},${start[1]},E`;
    const { distances, paths } = dijkstra(graph, startNode);

    let bestPaths: Path[] = [];
    let shortestDistanceToEnd = Infinity;
    distances.forEach((distance, node) => {
        if (node.startsWith(`${end[0]},${end[1]},`)) {
            if (!shortestDistanceToEnd || distance < shortestDistanceToEnd) {
                shortestDistanceToEnd = distance;
                bestPaths = paths.get(node)!;
            }
        }
    });

    const uniqueVisited = [
        ...new Set(
            bestPaths
                .flat()
                .map((node) => node.split(',').slice(0, 2).join(',')),
        ),
    ];

    return uniqueVisited.length;
};
