import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const srcDir = path.resolve('./src');

const years = fs
    .readdirSync(srcDir)
    .filter((name) => fs.statSync(path.join(srcDir, name)).isDirectory())
    .map((name) => Number(name))
    .sort((a, b) => b - a);

if (years.length === 0) {
    console.error('No year directories found in src/');
    process.exit(1);
}

const latestYear = years[0];

const days = fs
    .readdirSync(path.join(srcDir, `${latestYear}`))
    .filter((name) =>
        fs.statSync(path.join(srcDir, `${latestYear}`, name)).isDirectory(),
    )
    .map((name) => Number(name.replace('day', '')))
    .sort((a, b) => b - a);

if (days.length === 0) {
    console.error(`No day directories found in src/${latestYear}/`);
    process.exit(1);
}

const latestDay = days[0];

const latestTestFile = path.join(
    srcDir,
    `${latestYear}`,
    `day${String(latestDay).padStart(2, '0')}`,
    'solution.test.ts',
);

if (!fs.existsSync(latestTestFile)) {
    console.error(`Test file not found: ${latestTestFile}`);
    process.exit(1);
}

console.log(
    `Running tests in watch mode for Year ${latestYear}, Day ${latestDay}...`,
);
const vitestProcess = exec(`npx vitest watch ${latestTestFile}`);

vitestProcess.stdout.pipe(process.stdout);
vitestProcess.stderr.pipe(process.stderr);
