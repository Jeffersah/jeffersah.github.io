import AssetLoader from "../common/assets/AssetLoader";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import hoplite_tiles_url from './assets/hoplite_tiles.png';
import floor_digits_url from './assets/floor_and_digits.png';
import hp_image_url from './assets/hp.png';
import impact_url from './assets/hoplite_impacts.png';
import lavaLayers_url from './assets/lava_layers.png';
import ImageLoader from "../common/assets/ImageLoader";
import Sprite from "../common/rendering/Sprite";
import Rect from "../common/position/Rectangle";
import Point from "../common/position/Point";
import HpRenderer from "./HpRenderer";
import { SpriteAnimation } from "../common/rendering/SpriteAnimation";
import Zombie from "./entities/Zombie";
import Archer from "./entities/Archer";
import Mage from "./entities/Mage";
import Giant from "./entities/Giant";
import StoneEye from "./entities/StoneEye";

export default class Assets {
    tiles: SpriteSheet;
    lavaLayers: SpriteSheet;
    floor_and_digits: ImageLoader;
    hpImage: ImageLoader;
    hpRenderer: HpRenderer;
    impacts: ImageLoader;

    constructor(loader: AssetLoader) {
        this.tiles = new SpriteSheet(32, 32, hoplite_tiles_url, loader.registerAssetLoadCallback());
        this.floor_and_digits = new ImageLoader(floor_digits_url, loader.registerAssetLoadCallback());
        this.hpImage = new ImageLoader(hp_image_url, loader.registerAssetLoadCallback());
        this.impacts = new ImageLoader(impact_url, loader.registerAssetLoadCallback());
        this.lavaLayers = new SpriteSheet(32, 32, lavaLayers_url, loader.registerAssetLoadCallback());
    }

    getImpactAnimation(row: number) {
        return new SpriteAnimation(this.impacts.image, new Rect(0, row * 32, 32, 32), new Point(0, 0), new Point(32, 0), 8, 16, false);
    }

    onLoadFinished(){
        this.hpRenderer = new HpRenderer(this.hpImage);
        Zombie.onAssetsLoaded(this);
        Archer.onAssetsLoaded(this);
        Mage.onAssetsLoaded(this);
        Giant.onAssetsLoaded(this);
        StoneEye.onAssetsLoaded(this);
    }

    getDigitSprite(digit: number, digitRow ?: number):Sprite {
        return new Sprite(this.floor_and_digits.image, new Rect(41 + 7 * digit, (digitRow ?? 0) * 13, 7, 13));
    }

    drawNumber(ctx: CanvasRenderingContext2D, position: Point, value: number, digitRow ?: number) {
        const digits = value.toString().split('').map(s => parseInt(s));
        for(var i = 0; i < digits.length; i++) {
            this.getDigitSprite(digits[i], digitRow).draw(ctx, new Rect(position.x + i * 7, position.y, 7, 13), 0);
        }
    }
}