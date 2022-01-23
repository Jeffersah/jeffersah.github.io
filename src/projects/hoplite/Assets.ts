import AssetLoader from "../common/assets/AssetLoader";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import hoplite_tiles_url from './assets/hoplite_tiles.png';
import floor_and_digits from './assets/floor_and_digits.png';
import ImageLoader from "../common/assets/ImageLoader";
import Sprite from "../common/rendering/Sprite";
import Rect from "../common/position/Rectangle";
import Point from "../common/position/Point";

export default class Assets {
    tiles: SpriteSheet;
    floor_and_digits: ImageLoader;

    constructor(loader: AssetLoader) {
        this.tiles = new SpriteSheet(32, 32, hoplite_tiles_url, loader.registerAssetLoadCallback());
        this.floor_and_digits = new ImageLoader(floor_and_digits, loader.registerAssetLoadCallback());
    }

    getDigitSprite(digit: number):Sprite {
        return new Sprite(this.floor_and_digits.image, new Rect(41 + 7 * digit, 0, 7, 13));
    }

    drawNumber(ctx: CanvasRenderingContext2D, position: Point, value: number) {
        const digits = value.toString().split('').map(s => parseInt(s));
        for(var i = 0; i < digits.length; i++) {
            this.getDigitSprite(digits[i]).draw(ctx, new Rect(position.x + i * 7, position.y, 7, 13), 0);
        }
    }
}