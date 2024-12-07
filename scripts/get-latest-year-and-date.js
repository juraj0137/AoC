import path from 'path';
import fs from 'fs';

export function getLatestYearAndDate() {
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
    return { latestYear, latestDay };
}
