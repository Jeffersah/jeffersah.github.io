import AssetLoader from "../common/assets/AssetLoader";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import hoplite_tiles_url from './assets/hoplite_tiles.png';

export default class Assets {
    tiles: SpriteSheet;

    constructor(loader: AssetLoader) {
        this.tiles = new SpriteSheet(32, 32, hoplite_tiles_url, loader.registerAssetLoadCallback());
    }

}