import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

// Resolve paths using `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

type Solution = (input: string) => any;

const loadSolution = async (
    year: number,
    day: number,
): Promise<{ part1: Solution; part2: Solution } | null> => {
    const dayPath = path.resolve(
        rootDir,
        `./${year}/day${String(day).padStart(2, '0')}/solution.ts`,
    );
    try {
        const { solvePart1, solvePart2 } = await import(
            pathToFileURL(dayPath).href
        );
        return { part1: solvePart1, part2: solvePart2 };
    } catch (err) {
        console.error(`Could not load solution: ${err.message}`);
        return null;
    }
};

const main = async () => {
    const year = parseInt(process.argv[2]);
    const day = parseInt(process.argv[3]);
    const part = parseInt(process.argv[4]) || 1; // Default to Part 1
    const inputPath = path.resolve(
        rootDir,
        `./${year}/day${String(day).padStart(2, '0')}/input.txt`,
    );

    if (isNaN(year) || isNaN(day)) {
        console.error('Usage: npm run start <year> <day> [part]');
        return;
    }

    const solution = await loadSolution(year, day);
    if (!solution) {
        console.error(`Solution for Year ${year}, Day ${day} not found.`);
        return;
    }

    const input = fs.existsSync(inputPath)
        ? fs.readFileSync(inputPath, 'utf8')
        : '';
    const result = part === 2 ? solution.part2(input) : solution.part1(input);

    console.log(`Solution for Year ${year}, Day ${day}, Part ${part}:`, result);
};

main();
