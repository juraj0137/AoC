import { exec } from 'child_process';
import { getLatestYearAndDate } from './get-latest-year-and-date.js';

const { latestYear, latestDay } = getLatestYearAndDate();

const npmRunProcess = exec(
    `npm run start:solution ${latestYear} ${latestDay} ${process.argv[2] ?? 1}`,
);

npmRunProcess.stdout.pipe(process.stdout);
npmRunProcess.stderr.pipe(process.stderr);
