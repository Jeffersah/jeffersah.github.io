export function distinct<T>(items: T[]) {
    const results = [];
    for (const item of items) {
        if (results.indexOf(item) === -1) {
            results.push(item);
        }
    }
    return results;
}

export function groupBy<T>(items: T[], keySelector: (item: T) => string): { key: string, items: T[] }[] {
    const results: { [key: string]: T[] } = {};
    for (const item of items) {
        const key = keySelector(item);
        if (results[key] !== undefined) {
            results[key].push(item);
        } else {
            results[key] = [ item ];
        }
    }
    return Object.keys(results).map(key => ({ key, items: results[key] }));
}

export function repeat<T>(item: T, count: number): T[] {
    const arr = Array(count);
    arr.fill(item);
    return arr;
}