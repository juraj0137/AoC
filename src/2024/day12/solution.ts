type RegionProperties = {
    area: number;
    perimeter: number;
    corners: number;
    cell: string;
};

const calculateRegionProperties = (
    startCoordinates: number[],
    grid: string[][],
    visitedCells: Set<string>,
) => {
    const start = grid[startCoordinates[0]][startCoordinates[1]];

    const queue = [startCoordinates];
    let area = 0;
    let perimeter = 0;
    let corners = 0;

    while (queue.length > 0) {
        const [row, col] = queue.shift()!;

        if (visitedCells.has(`${row},${col}`)) {
            continue;
        }
        visitedCells.add(`${row},${col}`);

        // add neighbors to queue
        [
            [row - 1, col], // top
            [row + 1, col], // bottom
            [row, col - 1], // left
            [row, col + 1], // right
        ].forEach((neighbor) => {
            const [neighborRow, neighborCol] = neighbor;
            if (grid[neighborRow]?.[neighborCol] === start) {
                queue.push(neighbor);
            }
        });

        const top = grid[row - 1]?.[col];
        const bottom = grid[row + 1]?.[col];
        const left = grid[row][col - 1];
        const right = grid[row][col + 1];
        const topLeft = grid[row - 1]?.[col - 1];
        const topRight = grid[row - 1]?.[col + 1];
        const bottomLeft = grid[row + 1]?.[col - 1];
        const bottomRight = grid[row + 1]?.[col + 1];

        // count perimeter
        perimeter += [top, right, bottom, left].filter(
            (cell) => cell !== start,
        ).length;

        // count area
        area++;

        // outside corners
        [
            [top, left],
            [top, right],
            [bottom, left],
            [bottom, right],
        ]
            .filter(([n1, n2]) => n1 !== start && n2 !== start)
            .forEach(() => corners++);

        // inner corners
        [
            [top, left, topLeft],
            [top, right, topRight],
            [bottom, left, bottomLeft],
            [bottom, right, bottomRight],
        ]
            .filter(
                ([n1, n2, diagonal]) =>
                    n1 === start && n2 === start && diagonal !== start,
            )
            .forEach(() => corners++);
    }

    return { area, perimeter, corners };
};

export const findRegions = (input: string) => {
    const grid = input.split('\n').map((line) => line.split(''));

    const visitedCells = new Set<string>();

    let regions: RegionProperties[] = [];

    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (visitedCells.has(`${y},${x}`)) {
                return;
            }
            const { area, perimeter, corners } = calculateRegionProperties(
                [y, x],
                grid,
                visitedCells,
            );
            if (area === 0) {
                return;
            }
            regions.push({ area, perimeter, corners, cell });
        });
    });

    return regions;
};

export const solvePart1 = (input: string): any => {
    return findRegions(input).reduce((acc, { area, perimeter }) => {
        return acc + area * perimeter;
    }, 0);
};

export const solvePart2 = (input: string): any => {
    return findRegions(input).reduce((acc, { area, corners }) => {
        return acc + area * corners;
    }, 0);
};
