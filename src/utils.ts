export function createPairs<T>(array: T[]): [T, T][] {
    const pairs: [T, T][] = [];

    for (let i = 1; i < array.length; i++) {
        pairs.push([array[i - 1], array[i]]);
    }

    return pairs;
}
