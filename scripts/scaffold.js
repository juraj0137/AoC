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
    return null;
};

  export const solvePart2 = (input: string): any => {
    return null;
};`,
);

fs.writeFileSync(
    path.join(dayDir, 'solution.test.ts'),
    `import { solvePart1, solvePart2 } from './solution';
import { readFileSync } from 'fs';

const file = readFileSync(\`\${__dirname}/input.txt\`, 'utf-8');

describe('Day ${day} Solution (${year})', () => {
    const input = \`\`; 

    it('should solve Part 1', () => {
        expect(solvePart1(input)).toEqual(null); 
    });
    
    it.skip('should solve Part 1 with real data', () => {
        expect(solvePart1(file)).toEqual(null); 
    });

    it('should solve Part 2', () => {
        expect(solvePart2(input)).toEqual(null); 
    });
    
    it.skip('should solve Part 2 with real data', () => {
        expect(solvePart2(file)).toEqual(null); 
    });
});`,
);

console.log(`Scaffolded Year ${year}, Day ${day} at ${dayDir}`);
