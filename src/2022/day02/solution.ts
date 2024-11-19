type ColumnA = 'A' | 'B' | 'C';
type ColumnB = 'X' | 'Y' | 'Z';
type Sign = 'PAPER' | 'ROCK' | 'SCISSORS';

const SIGN_MAPPING: Record<ColumnA | ColumnB, Sign> = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
};
const SIGN_VALUE: Record<Sign, number> = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
};
const WINNING_COMBINATION: Record<Sign, Sign> = {
    ROCK: 'SCISSORS',
    PAPER: 'ROCK',
    SCISSORS: 'PAPER',
};
const LOSING_COMBINATION: Record<Sign, Sign> = {
    ROCK: 'PAPER',
    PAPER: 'SCISSORS',
    SCISSORS: 'ROCK',
};
const WIN_SCORE = 6;
const DRAW_SCORE = 3;

export const calculateRoundScore = (opponent: Sign, player: Sign): number => {
    if (opponent === player) {
        return SIGN_VALUE[player] + DRAW_SCORE;
    }

    if (LOSING_COMBINATION[player] === opponent) {
        return SIGN_VALUE[player];
    }

    if (WINNING_COMBINATION[player] === opponent) {
        return SIGN_VALUE[player] + WIN_SCORE;
    }

    throw new Error('Invalid combination');
};

export const evaluateRound = (input: string): number => {
    const [opponentSign, playerSign] = input.split(' ') as [ColumnA, ColumnA];
    return calculateRoundScore(
        SIGN_MAPPING[opponentSign],
        SIGN_MAPPING[playerSign],
    );
};

export const determineSignForResult = (
    opponent: ColumnA,
    result: ColumnB,
): Sign => {
    switch (result) {
        case 'X': // opponent wins
            return WINNING_COMBINATION[SIGN_MAPPING[opponent]];
        case 'Y': // draw
            return SIGN_MAPPING[opponent];
        case 'Z': // opponent loses
            return LOSING_COMBINATION[SIGN_MAPPING[opponent]];
        default:
            throw new Error('Invalid result');
    }
};

export const evaluateRoundForKnownResult = (input: string): number => {
    const [opponent, result] = input.split(' ') as [ColumnA, ColumnB];
    const playerSign = determineSignForResult(opponent, result);
    return calculateRoundScore(SIGN_MAPPING[opponent], playerSign);
};

export const solvePart1 = (input: string): any => {
    return input
        .split('\n')
        .map(evaluateRound)
        .reduce((acc, curr) => acc + curr, 0);
};

export const solvePart2 = (input: string): any => {
    return input
        .split('\n')
        .map(evaluateRoundForKnownResult)
        .reduce((acc, curr) => acc + curr, 0);
};
