export type Node = string;
export type Path = Node[];
export type Cost = number;
export type Graph = Map<Node, Map<Node, Cost>>;

class PriorityQueue<T> {
    private items: { value: T; priority: number }[] = [];

    enqueue(value: T, priority: number) {
        this.items.push({ value, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): T {
        return this.items.shift()!.value;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

export const dijkstra = (graph: Graph, start: Node) => {
    const distances = new Map<Node, Cost>();
    const paths = new Map<Node, Path[]>();
    const visited = new Set<Node>();
    const queue = new PriorityQueue<Node>();

    for (const node of graph.keys()) {
        distances.set(node, Infinity);
        paths.set(node, []);
    }
    distances.set(start, 0);
    paths.set(start, [[start]]);

    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
        const current = queue.dequeue()!;
        if (visited.has(current)) {
            continue;
        }
        visited.add(current);

        const neighbors = graph.get(current)!;
        for (const [neighbor, cost] of neighbors.entries()) {
            const newDistance = distances.get(current)! + cost;
            if (newDistance < distances.get(neighbor)!) {
                // shorter distance to neighbor found
                distances.set(neighbor, newDistance);
                paths.set(
                    neighbor,
                    paths.get(current)!.map((path) => [...path, neighbor]),
                );
                queue.enqueue(neighbor, newDistance);
            } else if (newDistance === distances.get(neighbor)!) {
                // alternative equally short path to neighbor found
                const currentPaths = paths
                    .get(current)!
                    .map((path) => [...path, neighbor]);
                paths.set(neighbor, [...paths.get(neighbor)!, ...currentPaths]);
            }
        }
    }

    return {
        distances,
        paths,
    };
};
