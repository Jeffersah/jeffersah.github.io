import { ISymbolDefinition, fullHealth, armor, partHealth, critHealth } from './SymbolDefinitions';

export const SYMBOL_LOC: { x: number, y: number, def: ISymbolDefinition }[] = [
    // HEAD
    ...SymbolRow(37, 0, 2, 0, 7, armor),
    ...SymbolBlock(44, 0, 3, [ { count: 3, def: fullHealth }, { count: 2, def: partHealth }, {count: 1, def: critHealth}]),

    // BODY
    ...SymbolRow(94, 14, 4, 7, 0, armor),
    ...SymbolBlock(94, 21, 8, [ { count: 8, def: fullHealth }, { count: 4, def: partHealth }, {count: 4, def: critHealth}]),

    // CORE
    ...SymbolRow(8, 19, 3, 7, 0, fullHealth),

    // L-ARM
    ...SymbolRow(0, 36, 4, 7, 0, armor),
    ...SymbolBlock(0, 43, 5, [ { count: 2, def: fullHealth }, { count: 2, def: partHealth }, {count: 1, def: critHealth}]),

    // R-ARM
    ...SymbolRow(101, 42, 4, 7, 0, armor),
    ...SymbolBlock(101, 49, 5, [ { count: 2, def: fullHealth }, { count: 2, def: partHealth }, {count: 1, def: critHealth}]),

    // L-HAND
    ...SymbolRow(17, 66, 2, 7, 0, armor),
    ...SymbolBlock(17, 73, 3, [ { count: 1, def: fullHealth }, { count: 1, def: partHealth }, {count: 1, def: critHealth}]),

    // R-HAND
    ...SymbolRow(93, 66, 2, 7, 0, armor),
    ...SymbolBlock(93, 73, 3, [ { count: 1, def: fullHealth }, { count: 1, def: partHealth }, {count: 1, def: critHealth}]),

    // L-LEG
    ...SymbolRow(13, 91, 4, 7, 0, armor),
    ...SymbolBlock(13, 98, 5, [ { count: 2, def: fullHealth }, { count: 2, def: partHealth }, {count: 1, def: critHealth}]),

    // R-LEG
    ...SymbolRow(85, 91, 4, 7, 0, armor),
    ...SymbolBlock(85, 98, 5, [ { count: 2, def: fullHealth }, { count: 2, def: partHealth }, {count: 1, def: critHealth}]),
];

function SymbolRow(x: number, y: number, count: number, dx: number, dy: number, def: ISymbolDefinition) {
    const results: { x: number, y: number, def: ISymbolDefinition }[] = [];
    for (let i = 0; i < count; i++) {
        results.push({x, y, def});
        if (dx !== 0) x += dx;
        if (dy !== 0) y += dy;
    }
    return results;
}

function SymbolBlock(sx: number, sy: number, width: number, types: { def: ISymbolDefinition, count: number }[]) {
    let x = sx;
    let xn = 0;
    let y = sy;
    const results: { x: number, y: number, def: ISymbolDefinition }[] = [];
    while (types.length > 0) {
        results.push({ x, y, def: types[0].def});
        xn ++;
        x += 7;
        if (xn === width) {
            // New row
            x = sx;
            y += 7;
            xn = 0;
        }

        types[0].count--;
        if (types[0].count === 0) types.splice(0, 1);
    }
    return results;
}