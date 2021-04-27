import React, { useEffect, useMemo, useState } from "react";
import AssetLoader from "../projects/common/assets/AssetLoader";

export default function useLoader<T>(loadItem : (finishCallback: () => void) => T, deps: React.DependencyList) : T | undefined {
    const [state, setState] = useState<T>(undefined);

    useEffect(() => {
        console.log('Reload item');
        const loader = new AssetLoader();
        const resultItem = loadItem(loader.registerAssetLoadCallback());
        loader.onAllFinished(() => {
            setState(resultItem);
        });
    }, deps);

    return state;
}