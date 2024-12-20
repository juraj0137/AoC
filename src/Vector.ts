export const addVectors = <T extends number[]>(
    vector1: T,
    vector2: number[],
): T => {
    if (vector1.length !== vector2.length) {
        throw new Error('Vectors must have the same length.');
    }
    return vector1.map((value, index) => value + vector2[index]) as T;
};

export const subtractVectors = <T extends number[]>(
    vector1: T,
    vector2: T,
): T => {
    if (vector1.length !== vector2.length) {
        throw new Error('Vectors must have the same length.');
    }
    return vector1.map((value, index) => value - vector2[index]) as T;
};

export const multiplyVectorByScalar = <T extends number[]>(
    vector: T,
    scalar: number,
): T => vector.map((n) => n * scalar) as T;
