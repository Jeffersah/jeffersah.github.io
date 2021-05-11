export function distinct<T>(items: T[]) {
    const results = [];
    for (const item of items) {
        if (results.indexOf(item) === -1) {
            results.push(item);
        }
    }
    return results;
}

export function flatMap<IT, OT>(items: IT[], func: ((arg: IT) => OT[])): OT[]
{
    let output = [];
    for(const item of items)
    {
        output.push(...func(item));
    }
    return output;
}

// export function groupBy<T>(items: T[], keySelector: (item: T) => string): { key: string, items: T[] }[] {
//     const results: { [key: string]: T[] } = {};
//     for (const item of items) {
//         const key = keySelector(item);
//         if (results[key] !== undefined) {
//             results[key].push(item);
//         } else {
//             results[key] = [ item ];
//         }
//     }
//     return Object.keys(results).map(key => ({ key, items: results[key] }));
// }

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

export function min<T>(items: T[], op: (item: T) => number) {
    let min = op(items[0]);
    for(let i = 1; i < items.length; i++){
        let v = op(items[i]);
        if(v < min) min = v;
    }
    return min;
}

export function max<T>(items: T[], op: (item: T) => number) {
    let max = op(items[0]);
    for(let i = 1; i < items.length; i++){
        let v = op(items[i]);
        if(v > max) max = v;
    }
    return max;
}


export function findMin<T>(items: T[], op: (item: T) => number) {
    let min = op(items[0]);
    let mini = items[0];
    for(let i = 1; i < items.length; i++){
        let v = op(items[i]);
        if(v < min) { 
            min = v;
            mini = items[i];
        }
    }
    return mini;
}

export function findMax<T>(items: T[], op: (item: T) => number) {
    let max = op(items[0]);
    let maxi = items[0];
    for(let i = 1; i < items.length; i++){
        let v = op(items[i]);
        if(v > max) { 
            max = v;
            maxi = items[i];
        }
    }
    return maxi;
}

export function groupBy<TKey, TValue>(items: TValue[], op: (item: TValue) => TKey): Map<TKey, TValue[]> {
    const map = new Map<TKey, TValue[]>();
    for(const item of items) {
        const key = op(item);
        if(map.has(key)) map.get(key).push(item);
        else map.set(key, [item]);
    }

    return map;
}

export function customGroupBy<TKey, TValue>(items: TValue[], getKey: (item: TValue) => TKey, cmp: (k1: TKey, k2: TKey)=> boolean):[TKey, TValue[]][] {
    let result:[TKey, TValue[]][] = [];
    for(const item of items) {
        const k = getKey(item);
        let handled = false;
        for(const [groupKey, groupValues] of result) {
            if(cmp(k, groupKey))
            {
                handled =true;
                groupValues.push(item);
                break;
            }
        }
        if(!handled) {
            result.push([k, [item]]);
        }
    }
    return result;
}