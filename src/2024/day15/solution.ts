import { Warehouse, MOVEMENTS } from './Warehouse';

export const parseInput = (input: string) => {
    const [warehouseMap, movements] = input.split('\n\n');
    return {
        warehouseMap,
        movements: movements
            .split('\n')
            .join('')
            .split('') as (keyof typeof MOVEMENTS)[],
    };
};

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const solvePart1 = (input: string): any => {
    const { movements, warehouseMap } = parseInput(input);
    const warehouse = new Warehouse(warehouseMap);

    for (const movement of movements) {
        warehouse.moveRobot(movement);
        // console.log(warehouse.toString());
        // await sleep(100); // Wait for 500ms
    }

    return warehouse
        .getBoxPositions()
        .reduce((acc, { x, y }) => acc + x + 100 * y, 0);
};

export const solvePart2 = (input: string): any => {
    const { movements, warehouseMap } = parseInput(input);
    const warehouse = new Warehouse(warehouseMap, true);

    for (const movement of movements.slice(0, 1)) {
        warehouse.moveRobot(movement);
        console.log(warehouse.toString());
        // await sleep(100); // Wait for 500ms
    }

    return null;
};
