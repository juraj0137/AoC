import fs from 'fs-extra';
import path from 'path';

const [year, day] = process.argv.slice(2);

if (!year || !day) {
    console.error('Usage: node scripts/scaffold.js <year> <day>');
    process.exit(1);
}

const dayDir = path.resolve(`src/${year}/day${day.padStart(2, '0')}`);
fs.ensureDirSync(dayDir);

fs.writeFileSync(path.join(dayDir, 'input.txt'), '');

fs.writeFileSync(
    path.join(dayDir, 'solution.ts'),
    `export const solvePart1 = (input: string): any => {
    return null; // Implement Part 1 solution here
  };

  export const solvePart2 = (input: string): any => {
    return null; // Implement Part 2 solution here
  };`,
);

fs.writeFileSync(
    path.join(dayDir, 'solution.test.ts'),
    `import { solvePart1, solvePart2 } from './solution';

  describe('Day ${day} Solution (${year})', () => {
    const input = ''; // Add example input

    it('should solve Part 1', () => {
      expect(solvePart1(input)).toEqual(null); // Replace with expected result for Part 1
    });

    it('should solve Part 2', () => {
      expect(solvePart2(input)).toEqual(null); // Replace with expected result for Part 2
    });
  });`,
);

console.log(`Scaffolded Year ${year}, Day ${day} at ${dayDir}`);
