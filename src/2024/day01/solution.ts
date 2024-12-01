function getSortedLocations(input: string) {
    const listA: number[] = [];
    const listB: number[] = [];

    input.split('\n').forEach((pair) => {
        const [locationA, locationB] = pair.split('   ');
        listA.push(parseInt(locationA));
        listB.push(parseInt(locationB));
    });

    listA.sort();
    listB.sort();
    return { listA, listB };
}

export const solvePart1 = (input: string): any => {
    const { listA, listB } = getSortedLocations(input);

    return listA.reduce((totalDistance, _, index) => {
        return totalDistance + Math.abs(listA[index] - listB[index]);
    }, 0);
};

function countsByValue(list: number[]) {
    return list.reduce(
        (counts, value) => {
            counts[value] = (counts[value] ?? 0) + 1;
            return counts;
        },
        {} as { [key: number]: number },
    );
}

export const solvePart2 = (input: string): any => {
    const { listA, listB } = getSortedLocations(input);

    const listACounts = countsByValue(listA);
    const listBCounts = countsByValue(listB);

    return Object.keys(listACounts).reduce((similarity, value) => {
        const intValue = parseInt(value);
        return (
            similarity +
            intValue * listACounts[intValue] * (listBCounts[intValue] ?? 0)
        );
    }, 0);
};
