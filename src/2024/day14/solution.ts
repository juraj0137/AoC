type Robot = {
    px: number;
    py: number;
    vx: number;
    vy: number;
};

const parseInput = (input: string): Robot[] => {
    return input.split('\n').map((line) => {
        const [p, v] = line.split(' ');
        const [px, py] = p.slice(2).split(',').map(Number);
        const [vx, vy] = v.slice(2).split(',').map(Number);
        return { px, py, vx, vy };
    });
};

const move = (robot: Robot, mapWidth: number, mapHeight: number): Robot => {
    const newPx = (robot.px + robot.vx) % mapWidth;
    const newPy = (robot.py + robot.vy) % mapHeight;

    return {
        px: newPx < 0 ? newPx + mapWidth : newPx,
        py: newPy < 0 ? newPy + mapHeight : newPy,
        vx: robot.vx,
        vy: robot.vy,
    };
};

const printMap = (
    robots: Robot[],
    mapWidth: number,
    mapHeight: number,
): void => {
    const map = Array.from({ length: mapHeight }, () =>
        Array.from({ length: mapWidth }, () => 0),
    );

    robots.forEach((robot) => {
        map[robot.py][robot.px] += 1;
    });

    const stringMap = map
        .map((row) => row.map((cell) => (cell === 0 ? ' ' : 'X')).join(''))
        .join('\n');

    console.log(stringMap);
};

const divideToQuadrants = (
    robots: Robot[],
    mapWidth: number,
    mapHeight: number,
): Robot[][] => {
    const quadrants: Robot[][] = [[], [], [], []];

    robots.forEach((robot) => {
        const quadrantWidth = Math.floor(mapWidth / 2);
        const quadrantHeight = Math.floor(mapHeight / 2);

        if (robot.px < quadrantWidth && robot.py < quadrantHeight) {
            quadrants[0].push(robot);
        } else if (robot.px > quadrantWidth && robot.py < quadrantHeight) {
            quadrants[1].push(robot);
        } else if (robot.px < quadrantWidth && robot.py > quadrantHeight) {
            quadrants[2].push(robot);
        } else if (robot.px > quadrantWidth && robot.py > quadrantHeight) {
            quadrants[3].push(robot);
        }
    });

    return quadrants;
};

export const solvePart1 = (
    input: string,
    mapWidth = 11,
    mapHeight = 7,
): any => {
    let robots = parseInput(input);

    const iterations = 100;
    for (let i = 0; i < iterations; i++) {
        robots = robots.map((robot) => move(robot, mapWidth, mapHeight));
    }

    const quadrants = divideToQuadrants(robots, mapWidth, mapHeight);
    const numberOfRobotsInQuadrants = quadrants.map(
        (quadrant) => quadrant.length,
    );

    return numberOfRobotsInQuadrants.reduce((acc, val) => acc * val, 1);
};

const findFiveRobotsInRow = (robots: Robot[]): Robot[] => {
    const sortedRobots = robots.sort((a, b) => a.px - b.px);
    const inRowCount = 6;
    for (let i = 0; i < sortedRobots.length - inRowCount - 1; i++) {
        const robotsInRow = sortedRobots.slice(i, i + inRowCount);
        const isFiveRobotsInRow = robotsInRow.every(
            (robot, index) => robot.px === sortedRobots[i].px + index,
        );

        if (isFiveRobotsInRow) {
            return robotsInRow;
        }
    }

    return [];
};

const printRobots = (robots: Robot[]): void => {
    const mapWidth = 101;
    const mapHeight = 103;

    let step = 1;
    while (true) {
        console.log(`Step ${step}`);
        robots = robots.map((robot) => move(robot, mapWidth, mapHeight));
        if (findFiveRobotsInRow(robots).length > 0) {
            console.log('Found five robots in a row at step', step);
            printMap(robots, mapWidth, mapHeight);
            return;
        }

        step++;
    }
};

export const solvePart2 = async (input: string): any => {
    let robots = parseInput(input);

    printRobots(robots);
    return null;
};
