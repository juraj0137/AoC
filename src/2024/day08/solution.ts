import { Coordinates } from '../../CoordinatesMap';
import {
    subtractVectors,
    addVectors,
    multiplyVectorByScalar,
} from '../../Vector';

export type Finder = (
    antennaB: Coordinates,
    antennaA: Coordinates,
    map: string[][],
) => Coordinates[];

const isWithinMap = ([row, col]: Coordinates, map: string[][]) => {
    return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
};

const parseMap = (input: string) => {
    return input.split('\n').map((line) => line.split(''));
};

const findTwoClosestAntinodes: Finder = (antennaB, antennaA, antinodes) => {
    const diff = subtractVectors(antennaB, antennaA);
    return [subtractVectors(antennaA, diff), addVectors(antennaB, diff)];
};

const findAllAntinodesInLine: Finder = (
    antennaB,
    antennaA,
    map: string[][],
) => {
    const diff = subtractVectors(antennaB, antennaA) as Coordinates;

    const antinodes: Coordinates[] = [];
    let multiplexer = 0;
    while (true) {
        const multipliedDiff = multiplyVectorByScalar(diff, multiplexer++);
        const antinodeA = subtractVectors(antennaA, multipliedDiff);

        if (!isWithinMap(antinodeA, map)) {
            break;
        }
        antinodes.push(antinodeA);
    }

    multiplexer = 0;
    while (true) {
        const multipliedDiff = multiplyVectorByScalar(diff, multiplexer++);
        const antinodeB = addVectors(antennaB, multipliedDiff);

        if (!isWithinMap(antinodeB, map)) {
            break;
        }
        antinodes.push(antinodeB);
    }

    return antinodes;
};

const findAntinodes = (
    antennas: Coordinates[],
    finder: Finder,
    map: string[][],
): Coordinates[] => {
    const antinodes: Coordinates[] = [];

    antennas.forEach((antennaA, index) => {
        antennas.slice(index + 1).forEach((antennaB) => {
            antinodes.push(...finder(antennaB, antennaA, map));
        });
    });

    return antinodes.filter((location) => isWithinMap(location, map));
};

const groupLocationsByFrequency = (map: string[][]) => {
    const locationsByFreq: Record<number | string, Coordinates[]> = {};

    map.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === '.') {
                return;
            }
            if (!locationsByFreq[cell]) {
                locationsByFreq[cell] = [];
            }
            locationsByFreq[cell]?.push([rowIndex, colIndex]);
        });
    });
    return locationsByFreq;
};

export const solvePart1 = (input: string): any => {
    const map = parseMap(input);
    const locationsByFreq = groupLocationsByFrequency(map);

    const antinodes = new Set<string>();
    for (const antennas of Object.values(locationsByFreq)) {
        findAntinodes(antennas, findTwoClosestAntinodes, map).forEach(
            ([row, col]) => {
                antinodes.add(`${row},${col}`);
            },
        );
    }

    return antinodes.size;
};

export const solvePart2 = (input: string): any => {
    const map = parseMap(input);
    const locationsByFreq = groupLocationsByFrequency(map);

    const antinodes = new Set<string>();
    for (const antennas of Object.values(locationsByFreq)) {
        findAntinodes(antennas, findAllAntinodesInLine, map).forEach(
            ([row, col]) => {
                antinodes.add(`${row},${col}`);
            },
        );
    }

    return antinodes.size;
};
