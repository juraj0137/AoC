export const parseInput = (input: string) => {
    return input.split('\n\n').map((machine) => {
        const [machineA, machineB, price] = machine.split('\n');
        const aMatches = machineA.match(/.+ X.(\d+), Y.(\d+)/);
        const bMatches = machineB.match(/.+ X.(\d+), Y.(\d+)/);
        const prizeMatches = price.match(/.+ X=(\d+), Y=(\d+)/);

        return {
            a: { x: Number(aMatches![1]), y: Number(aMatches![2]) },
            b: { x: Number(bMatches![1]), y: Number(bMatches![2]) },
            prize: { x: Number(prizeMatches![1]), y: Number(prizeMatches![2]) },
        };
    });
};

export const findMinimumCost = ({
    a,
    b,
    prize,
}: {
    a: { x: number; y: number };
    b: { x: number; y: number };
    prize: { x: number; y: number };
}) => {
    const q = [];
    for (let i = 0; i < 100; i++) {
        q.push(a.x * i);
    }

    for (let pressesA = 0; pressesA <= 10000; pressesA++) {
        const remainingX = prize.x - pressesA * a.x;
        const remainingY = prize.y - pressesA * a.y;

        if (
            remainingX % b.x === 0 &&
            remainingY % b.y === 0 &&
            remainingX / b.x === remainingY / b.y
        ) {
            return 3 * pressesA + remainingX / b.x;
        }
    }

    return Number.NaN;
};

export const solvePart1 = (input: string): any => {
    return parseInput(input)
        .map((data) => {
            return findMinimumCost({
                a: data.a,
                b: data.b,
                prize: data.prize,
            });
        })
        .filter(Boolean)
        .reduce((acc, val) => acc + val, 0);
};

export const solvePart2 = (input: string): any => {
    return parseInput(input)
        .map((data) => {
            return findMinimumCost({
                a: data.a,
                b: data.b,
                prize: {
                    x: data.prize.x + 10000000000000,
                    y: data.prize.y + 10000000000000,
                },
            });
        })
        .filter(Boolean)
        .reduce((acc, val) => acc + val, 0);
};
