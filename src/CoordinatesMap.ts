export type Coordinates = [number, number];

export class CoordinatesMap<V> {
    private map = new Map<number, V>();

    get size(): number {
        return this.map.size;
    }

    private hash(key: Coordinates): number {
        const [row, col] = key;
        const prime = 211; // A small prime number to reduce collisions
        return row * prime + col;
    }

    set(key: Coordinates, value: V): void {
        const hashedKey = this.hash(key);
        this.map.set(hashedKey, value);
    }

    get(key: Coordinates): V | undefined {
        const hashedKey = this.hash(key);
        return this.map.get(hashedKey);
    }

    has(key: Coordinates): boolean {
        const hashedKey = this.hash(key);
        return this.map.has(hashedKey);
    }

    delete(key: Coordinates): boolean {
        const hashedKey = this.hash(key);
        return this.map.delete(hashedKey);
    }

    clear(): void {
        this.map.clear();
    }

    keys(): IterableIterator<Coordinates> {
        throw new Error(
            'Custom hash keys are not reversible without additional storage.',
        );
    }

    values(): IterableIterator<V> {
        return this.map.values();
    }

    entries(): IterableIterator<[Coordinates, V]> {
        throw new Error(
            'Custom hash entries are not reversible without additional storage.',
        );
    }
}
