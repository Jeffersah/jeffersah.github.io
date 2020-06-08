export default class AssetLoader {
    waitingAssetCount: number;
    loadedAssetCount: number;
    boundCallback: undefined|(() => void);

    constructor() {
        this.waitingAssetCount = 0;
        this.loadedAssetCount = 0;
        this.boundCallback = undefined;
    }

    onAllFinished(act: () => void) {
        this.boundCallback = act;
        if (this.waitingAssetCount > 0 && this.waitingAssetCount === this.loadedAssetCount) {
            this.boundCallback();
        }
    }

    registerAssetLoadCallback(): (() => void) {
        this.waitingAssetCount++;
        return () => {
            this.loadedAssetCount++;
            if (this.waitingAssetCount === this.loadedAssetCount && this.boundCallback !== undefined) {
                this.boundCallback();
            }
        };
    }
}