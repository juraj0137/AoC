export const processStone = (x: number): number[] => {
    if (x === 0) {
        return [1];
    }

    const length = `${x}`.length;
    if (length % 2 === 0) {
        const half = length / 2;
        const left = x.toString().slice(0, half);
        const right = x.toString().slice(half);
        return [Number(left), Number(right)];
    }

    return [x * 2024];
};

const blinkStones = (stones: number[], blinks: number): number => {
    let stoneCounts = new Map<number, number>();

    stones.forEach((stone: number) => {
        stoneCounts.set(stone, 1);
    });

    for (let i = 0; i < blinks; i++) {
        const newStoneCounts = new Map<number, number>();

        for (const [stone, count] of stoneCounts) {
            processStone(stone).forEach((newStone) =>
                newStoneCounts.set(
                    newStone,
                    (newStoneCounts.get(newStone) ?? 0) + count,
                ),
            );
        }

        stoneCounts = newStoneCounts;
    }

    return [...stoneCounts.values()].reduce((acc, val) => acc + val, 0);
};

export const solvePart1 = (input: string): any => {
    let stones = input.split(' ').map(Number);
    return blinkStones(stones, 25);
};

export const solvePart2 = (input: string): any => {
    let stones = input.split(' ').map(Number);
    return blinkStones(stones, 75);
};
