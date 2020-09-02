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

export function first<T>(items: T[], predicate: (item: T) => boolean): T {
    for (const item of items) {
        if (predicate(item)) return item;
    }
    return undefined;
}

export function zip<TA, TB, TO>(a: TA[], b: TB[], zipper: (a: TA, b: TB) => TO): TO[] {
    const results = [];
    for (let i = 0; i < a.length && i < b.length; i++) {
        results.push(zipper(a[i], b[i]));
    }
    return results;
}

export function all<T>(items: T[], op: (item: T) => boolean) {
    for (const item of items) {
        if (!op(item))return false;
    }
    return true;
}

export function any<T>(items: T[], op: (item: T) => boolean) {
    for (const item of items) {
        if (op(item))return true;
    }
    return false;
}

export function range(start: number, count: number) {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(start + i);
    }
    return result;
}