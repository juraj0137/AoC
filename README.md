# Advent of Code

A TypeScript project for solving Advent of Code puzzles using TDD.

## Features

-   TypeScript with Vite and Vitest for testing.
-   Dynamic solution loader for multiple years and days.
-   Automated scaffolding for new puzzles.
-   Script to run the latest puzzle's test in watch mode.

## Scripts

-   `npm run scaffold <year> <day>`: Scaffold a new day's files.
-   `npm run test:latest`: Run tests in watch mode for the latest puzzle.
-   `npm run start <year> <day> <part 1|2>`: Execute a solution dynamically.
-   `npm run lint`: Run ESLint to check code quality.
-   `npm run format`: Format code using Prettier.
-   `npm run test`: Run all tests.

## Setup

1. Install dependencies:

```bash
npm install
```

## Project structure

```
src/
├── 2023/
│   ├── day01/
│   │   ├── input.txt
│   │   ├── solution.ts
│   │   └── solution.test.ts
│   ├── day02/
│   │   ├── input.txt
│   │   ├── solution.ts
│   │   └── solution.test.ts
└── 2024/
    ├── day01/
    │   ├── input.txt
    │   ├── solution.ts
    │   └── solution.test.ts

```
