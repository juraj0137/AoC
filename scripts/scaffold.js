import fs from 'fs-extra';
import path from 'path';

const [year, day] = process.argv.slice(2);

if (!year || !day) {
    console.error('Usage: node scripts/scaffold.js <year> <day>');
    process.exit(1);
}

const dayDir = path.resolve(`src/${year}/day${day.padStart(2, '0')}`);
fs.ensureDirSync(dayDir);

fs.writeFileSync(
    path.join(dayDir, 'input.txt'),
    '', // Empty input file
);

fs.writeFileSync(
    path.join(dayDir, 'solution.ts'),
    `export const solve = (input: string): any => {
    return null; // Implement your solution here
  };`,
);

fs.writeFileSync(
    path.join(dayDir, 'solution.test.ts'),
    `import { solve } from './solution';

  describe('Day ${day} Solution (${year})', () => {
    it('should solve the example input', () => {
      const input = ''; // Add example input
      expect(solve(input)).toEqual(null); // Replace with expected output
    });
  });`,
);

console.log(`Scaffolded Year ${year}, Day ${day} at ${dayDir}`);
