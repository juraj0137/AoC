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
): Promise<Solution | null> => {
    const dayPath = path.resolve(
        rootDir,
        `./${year}/day${String(day).padStart(2, '0')}/solution.ts`,
    );
    try {
        const fileUrl = pathToFileURL(dayPath).href; // Convert the file path to a `file://` URL
        const { solve } = await import(fileUrl);
        return solve;
    } catch (err) {
        console.error(`Could not load solution: ${err}`);
        return null;
    }
};

const main = async () => {
    const year = parseInt(process.argv[2]);
    const day = parseInt(process.argv[3]);
    const inputPath = path.resolve(
        rootDir,
        `./${year}/day${String(day).padStart(2, '0')}/input.txt`,
    );

    if (isNaN(year) || isNaN(day)) {
        console.error('Usage: npm run start <year> <day>');
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
    console.log(`Solution for Year ${year}, Day ${day}:`, solution(input));
};

main();
