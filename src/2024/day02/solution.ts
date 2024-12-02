import { createPairs } from '../../utils';

const parseLevels = (levelsInput: string) => {
    return levelsInput.split(' ').map((level) => parseInt(level, 10));
};

const isSafeDifference = (levelA: number, levelB: number) => {
    return Math.abs(levelA - levelB) >= 1 && Math.abs(levelA - levelB) <= 3;
};

const hasSameDirection = (levels: number[]) => {
    let hasDecreased = false;
    let hasIncreased = false;

    for (let i = 1; i < levels.length; i++) {
        if (levels[i - 1] == levels[i]) {
            return false;
        }
        if (levels[i - 1] > levels[i]) {
            hasDecreased = true;
        }
        if (levels[i - 1] < levels[i]) {
            hasIncreased = true;
        }

        if (hasDecreased && hasIncreased) {
            return false;
        }
    }

    return true;
};

function isReportSafe(levels: number[]) {
    if (!hasSameDirection(levels)) {
        return false;
    }

    return createPairs(levels).every(([first, second]) =>
        isSafeDifference(first, second),
    );
}

export function isReportSafeWithOneError(levelsInput: string) {
    const levels = parseLevels(levelsInput);

    return levels.some((_, i) => {
        const modifiedLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
        return isReportSafe(modifiedLevels);
    });
}

export const solvePart1 = (input: string): any => {
    return input.split('\n').map(parseLevels).filter(isReportSafe).length;
};

export const solvePart2 = (input: string): any => {
    return input.split('\n').filter(isReportSafeWithOneError).length;
};
