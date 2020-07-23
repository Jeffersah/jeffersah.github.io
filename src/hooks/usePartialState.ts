// Not really a hook, but useful as part of hooks
export default function usePartialState<T, K extends keyof T>(state: T, setState: (state: Partial<T>) => void, key: K): [T[K], (setState: T[K]) => void] {
    const item = state[key];
    return [
        state[key],
        (newItem: T[K]) => {
            const resultItem: T = {...state};
            resultItem[key] = newItem;
            setState(resultItem);
        }
    ];
}