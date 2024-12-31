const SPACE = '.';
const BOX = 'O';
const WALL = '#';
const ROBOT = '@';
export const MOVEMENTS = {
    '^': [0, -1],
    v: [0, 1],
    '<': [-1, 0],
    '>': [1, 0],
};

type Movement = keyof typeof MOVEMENTS;

abstract class Block {
    protected constructor(
        public x: number,
        public y: number,
        public warehouse: Warehouse,
    ) {}

    get [Symbol.toStringTag]() {
        return this.toString();
    }
}

abstract class MoveableBlock extends Block {
    canMove(direction: Movement, x = this.x, y = this.y): boolean {
        const [dx, dy] = MOVEMENTS[direction];
        const [nextX, nextY] = [x + dx, y + dy] as [number, number];

        const nextBlock = this.warehouse.field[nextY][nextX];

        if (nextBlock instanceof EmptySpace) {
            return true;
        }

        if (nextBlock instanceof MoveableBlock) {
            return nextBlock.canMove(direction);
        }

        return false;
    }

    move(direction: Movement) {
        const [dx, dy] = MOVEMENTS[direction];
        const [nextX, nextY] = [this.x + dx, this.y + dy] as [number, number];
        const nextBlock = this.warehouse.field[nextY][nextX];

        if (nextBlock instanceof MoveableBlock) {
            nextBlock.move(direction);
            this.move(direction);
            return;
        }

        if (nextBlock instanceof EmptySpace) {
            this.warehouse.field[this.y][this.x] = new EmptySpace(
                this.x,
                this.y,
                this.warehouse,
            );
            this.warehouse.field[nextY][nextX] = this;
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class Box extends MoveableBlock {
    constructor(x: number, y: number, warehouse: Warehouse) {
        super(x, y, warehouse);
    }

    toString() {
        return BOX;
    }
}

class DoubleBox extends Box {
    constructor(
        x: number,
        y: number,
        public x2: number,
        warehouse: Warehouse,
    ) {
        super(x, y, warehouse);
    }

    canMove(direction: Movement): boolean {
        const [dx, dy] = MOVEMENTS[direction];
        const [nextX, nextX2, nextY] = [
            this.x + dx,
            this.x2 + dx,
            this.y + dy,
        ] as [number, number, number];

        const nextBlock = this.warehouse.field[nextY][nextX];
        const nextBlock2 = this.warehouse.field[nextY][nextX2];

        if (nextBlock === this || nextBlock2 === this) {
            return true;
        }

        if (
            nextBlock instanceof MoveableBlock &&
            !nextBlock.canMove(direction)
        ) {
            return false;
        }

        if (
            nextBlock2 instanceof MoveableBlock &&
            !nextBlock2.canMove(direction)
        ) {
            return false;
        }

        if (nextBlock instanceof Wall) {
            return false;
        }

        return true;
    }

    move(direction: Movement) {
        if (!this.canMove(direction)) {
            return;
        }

        const [dx, dy] = MOVEMENTS[direction];
        const [nextX, nextX2, nextY] = [
            this.x + dx,
            this.x2 + dx,
            this.y + dy,
        ] as [number, number, number];
        let nextBlock = this.warehouse.field[nextY][nextX];
        let nextBlock2 = this.warehouse.field[nextY][nextX2];

        if (nextBlock instanceof MoveableBlock) {
            nextBlock.move(direction);
            nextBlock = this.warehouse.field[nextY][nextX];
        }

        if (nextBlock2 instanceof MoveableBlock) {
            nextBlock2.move(direction);
            nextBlock2 = this.warehouse.field[nextY][nextX2];
        }

        this.warehouse.field[this.y][this.x] = new EmptySpace(
            this.x,
            this.y,
            this.warehouse,
        );
        this.warehouse.field[this.y][this.x2] = new EmptySpace(
            this.x2,
            this.y,
            this.warehouse,
        );

        this.warehouse.field[nextY][nextX] = this;
        this.warehouse.field[nextY][nextX2] = this;
        this.x = nextX;
        this.x2 = nextX2;
        this.y = nextY;
    }

    toString(): string {
        return '[]';
    }
}

class Wall extends Block {
    constructor(x: number, y: number, warehouse: Warehouse) {
        super(x, y, warehouse);
    }

    toString() {
        return WALL;
    }
}

class Robot extends MoveableBlock {
    constructor(x: number, y: number, warehouse: Warehouse) {
        super(x, y, warehouse);
    }

    toString() {
        return ROBOT;
    }
}

class EmptySpace extends Block {
    constructor(x: number, y: number, warehouse: Warehouse) {
        super(x, y, warehouse);
    }

    toString() {
        return ' ';
    }
}

export class Warehouse {
    field: (Block | null)[][];
    robot!: Robot;

    constructor(map: string, isScaled = false) {
        const parsedMap = map
            .split('\n')
            .map((line) => (isScaled ? this.scaleLine(line) : line))
            .map((line) => line.split(''));

        this.field = Array.from({ length: parsedMap.length }, () =>
            Array.from({ length: parsedMap[0].length }, () => null),
        );

        parsedMap.forEach((line, y) => {
            line.forEach((char, x) => {
                switch (char) {
                    case WALL:
                        this.field[y][x] = new Wall(x, y, this);
                        return;
                    case BOX:
                        this.field[y][x] = new Box(x, y, this);
                        return;
                    case '[':
                        this.field[y][x] = new DoubleBox(x, y, x + 1, this);
                        this.field[y][x + 1] = this.field[y][x];
                        return;
                    case ']':
                        return;
                    case ROBOT:
                        const robot = new Robot(x, y, this);
                        this.robot = robot;
                        this.field[y][x] = robot;
                        return;
                    case SPACE:
                        this.field[y][x] = new EmptySpace(x, y, this);
                        return;
                    default:
                        throw new Error(`Unknown character: ${char}`);
                }
            });
        });

        if (!this.robot) {
            throw new Error('Robot not found');
        }
    }

    scaleLine(line: string) {
        return line
            .split('')
            .map((char) => {
                switch (char) {
                    case '#':
                        return '##';
                    case 'O':
                        return '[]';
                    case '.':
                        return '..';
                    case '@':
                        return '@.';
                    default:
                        return char;
                }
            })
            .join('');
    }

    moveRobot(direction: Movement) {
        if (this.robot.canMove(direction)) {
            this.robot.move(direction);
        }
    }

    isWithinBounds([x, y]: [number, number]) {
        return (
            x >= 0 &&
            x < this.field[0].length &&
            y >= 0 &&
            y < this.field.length
        );
    }

    getBoxPositions(): Box[] {
        const boxes: Box[] = [];
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                const block = this.field[y][x];
                if (block instanceof Box) {
                    boxes.push(block);
                }
            }
        }
        return boxes;
    }

    toString() {
        return this.field
            .map((line, y) =>
                line
                    .map((cell, x) => {
                        if (
                            cell instanceof DoubleBox &&
                            this.field[y][x + 1] === cell
                        ) {
                            return '';
                        }
                        return cell;
                    })
                    .join(''),
            )
            .join('\n');
    }
}
