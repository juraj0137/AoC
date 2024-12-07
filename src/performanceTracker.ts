type MeasurementData = {
    total: number;
    count: number;
};

const performanceTracker = (() => {
    console.log('Performance Tracker Initialized');
    const measurements: Map<string, MeasurementData> = new Map();

    return {
        measure: <T>(name: string, func: () => T): T => {
            const start = performance.now();
            const result = func();
            const end = performance.now();

            const duration = end - start;
            if (!measurements.has(name)) {
                measurements.set(name, { total: 0, count: 0 });
            }
            const data = measurements.get(name)!;
            data.total += duration;
            data.count += 1;

            return result;
        },

        displayResults: () => {
            console.log('Performance Measurements:');
            measurements.forEach((data, name) => {
                console.log(
                    `${name}: Total: ${data.total.toFixed(2)}ms, Per Call: ${(data.total / data.count).toFixed(2)}ms, Count: ${data.count}`,
                );
            });
        },
    };
})();

export default performanceTracker;
