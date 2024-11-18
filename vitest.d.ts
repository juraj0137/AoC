/// <reference types="vitest" />

import { expect, it, describe } from 'vitest';

declare global {
    var expect: typeof expect;
    var it: typeof it;
    var describe: typeof describe;
}
