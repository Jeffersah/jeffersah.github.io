import AssetLoader from '../common/assets/AssetLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import { ResizeCanvas, NearestNeighborScaling } from '../common/CanvasHelpers';
import asciiUrl from '../common-assets/ascii.png';

export default function Run() {
    const assetLoader = new AssetLoader();
    const text = new SpriteSheet(8, 16, asciiUrl, assetLoader.registerAssetLoadCallback());

    assetLoader.onAllFinished(() => Start(text));
}

function Start(text: SpriteSheet) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ResizeCanvas(canvas, 500, 500);
    const ctx = canvas.getContext('2d');
    NearestNeighborScaling(ctx);
}


const tagDetector = /\[\[([^]]*)\]\]/;
export function SetInputText(text: string) {
    console.log('Got text: ' + text);
    tagDetector.exec(text)
}