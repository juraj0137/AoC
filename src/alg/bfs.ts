type Graph = Record<string, string[]>;

export function bfs(graph: Graph, startNode: string): string[] {
    const visited: Set<string> = new Set();
    const queue: string[] = [];
    const result: string[] = [];

    // Start by visiting the startNode
    queue.push(startNode);
    visited.add(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode);

        for (const neighbor of graph[currentNode] || []) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
            }
        }
    }

    return result;
}

// Example usage:
const graph: Graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E'],
};

const startNode = 'A';
console.log(bfs(graph, startNode));
