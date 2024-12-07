import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { getLatestYearAndDate } from './get-latest-year-and-date.js';

const { latestYear, latestDay } = getLatestYearAndDate();

const srcDir = path.resolve('./src');
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
