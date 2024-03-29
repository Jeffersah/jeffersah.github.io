import AssetLoader from "../common/assets/AssetLoader";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import hoplite_tiles_url from './assets/hoplite_tiles.png';
import features_url from './assets/hoplite_features.png';
import floor_digits_url from './assets/floor_and_digits.png';
import enemies_url from './assets/hoplite_enemies.png';
import hp_image_url from './assets/hp.png';
import impact_url from './assets/hoplite_impacts.png';
import lavaLayers_url from './assets/lava_layers.png';
import shop_url from './assets/shopUI.png';
import weapon_url from './assets/hoplite_weapons.png';
import ascii_url from '../common-assets/ascii.png';
import ascii_sm_url from '../common-assets/ascii_6x8.png';
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
import LifeGem, { RunicLifeGem } from "./features/LifeGem";
import Stairs, { LockedStairs } from "./features/Stairs";
import Shrine from "./features/Shrine";
import { IAssetSheet, IsAnimationAsset } from "./assets/IAssetSheet";
import IRenderable from "../common/rendering/IRenderable";
import IRenderableSource from "../common/rendering/IRenderableSource";
import * as C from './Constants';
import Spider from "./entities/Spider";
import PlayerTurnGamePhase from "./phases/PlayerTurnGamePhase";
import Portal from "./features/Portal";
import StoneDisc from "./entities/StoneDisc";
import BlueMage from "./entities/BlueMage";
import BlueBurstDisc from "./entities/BlueBurstDisc";
import ShopPhase from "./phases/ShopPhase";
import Shop from "./features/Shop";



export default class Assets {

    tiles: SpriteSheet;
    enemies: SpriteSheet;
    features: SpriteSheet;
    lavaLayers: SpriteSheet;
    floor_and_digits: ImageLoader;
    hpImage: ImageLoader;
    hpRenderer: HpRenderer;
    impacts: ImageLoader;
    assetSheet: IAssetSheet;
    weapons: ImageLoader;
    shopUI: ImageLoader;
    
    ascii: SpriteSheet;
    asciiSmall: SpriteSheet;

    assetFilesByName: {[key: string]: CanvasImageSource} = {};

    constructor(loader: AssetLoader) {
        this.tiles = new SpriteSheet(32, 32, hoplite_tiles_url, loader.registerAssetLoadCallback());
        this.enemies = new SpriteSheet(32, 32, enemies_url, loader.registerAssetLoadCallback());
        this.features = new SpriteSheet(32, 32, features_url, loader.registerAssetLoadCallback());
        this.floor_and_digits = new ImageLoader(floor_digits_url, loader.registerAssetLoadCallback());
        this.hpImage = new ImageLoader(hp_image_url, loader.registerAssetLoadCallback());
        this.impacts = new ImageLoader(impact_url, loader.registerAssetLoadCallback());
        this.lavaLayers = new SpriteSheet(32, 32, lavaLayers_url, loader.registerAssetLoadCallback());
        this.weapons = new ImageLoader(weapon_url, loader.registerAssetLoadCallback());
        this.shopUI = new ImageLoader(shop_url, loader.registerAssetLoadCallback());
        this.ascii = new SpriteSheet(8, 16, ascii_url, loader.registerAssetLoadCallback());
        this.asciiSmall = new SpriteSheet(6, 8, ascii_sm_url, loader.registerAssetLoadCallback());

        const jsonCallback = loader.registerAssetLoadCallback();
        import(
            /* webpackChunkName: "hoplite-asset-definitions" */
            './assets/AssetSheet.json'
        ).then(value => {
            console.log(value.default);
            this.assetSheet = value.default as any as IAssetSheet;
            jsonCallback();
        });
    }

    getImpactAnimation(row: number) {
        return new SpriteAnimation(this.impacts.image, new Rect(0, row * 32, 32, 32), new Point(0, 0), new Point(32, 0), 8, 16, false);
    }

    onLoadFinished(){
        this.hpRenderer = new HpRenderer(this.hpImage);
        this.assetFilesByName = {
            'hoplite_tiles': this.tiles.image,
            'hoplite_impacts': this.impacts.image,
            'floor_and_digits': this.floor_and_digits.image,
            'hp': this.hpImage.image,
            'lava_layers': this.lavaLayers.image,
            'features': this.features.image,
            'enemies': this.enemies.image,
            'weapons': this.weapons.image,
            'shop_ui': this.shopUI.image,
        }
        
        PlayerTurnGamePhase.onAssetsLoaded(this);
        ShopPhase.onAssetsLoaded(this);

        Zombie.onAssetsLoaded(this);
        Archer.onAssetsLoaded(this);
        Mage.onAssetsLoaded(this);
        Giant.onAssetsLoaded(this);
        StoneEye.onAssetsLoaded(this);
        Spider.onAssetsLoaded(this);
        StoneDisc.onAssetsLoaded(this);
        BlueMage.onAssetsLoaded(this);
        BlueBurstDisc.onAssetsLoaded(this);

        LifeGem.onAssetsLoaded(this);
        Stairs.onAssetsLoaded(this);
        Shrine.onAssetsLoaded(this);
        RunicLifeGem.onAssetsLoaded(this);
        LockedStairs.onAssetsLoaded(this);
        Portal.onAssetsLoaded(this);
        Shop.onAssetsLoaded(this);
    }

    getAsset(name: string, suppressErrors?: boolean): IRenderableSource {
        const definition = this.assetSheet[name];
        if(definition === undefined) {
            if(!suppressErrors)
                console.error('Asset not found: ' + name);
            return undefined;
        }
        else {
            var file = this.assetFilesByName[definition.file];
            if(file === undefined){ 
                if(!suppressErrors)
                    console.error('Asset ' + name + ' references missing file: ' + definition.file);
                return undefined;
            }
            const units = definition.units ?? 'tiles';
            const scaleFactor = units === 'tiles' ? C.TILE_WIDTH : 1;

            const x = definition.pos[0];
            const y = definition.pos[1];
            const w = definition.size === undefined ? 1 : definition.size[0];
            const h = definition.size === undefined ? 1 : definition.size[1];
            const origin_x = definition.origin === undefined ? 0 : definition.origin[0];
            const origin_y = definition.origin === undefined ? 0 : definition.origin[1];

            if(IsAnimationAsset(definition)) {
                const advx = definition.advance === undefined ? 1: definition.advance[0];
                const advy = definition.advance === undefined ? 0: definition.advance[1];
                return new SpriteAnimation(
                    file,
                    new Rect(x * scaleFactor, y * scaleFactor, w * scaleFactor, h * scaleFactor),
                    new Point(origin_x, origin_y),
                    new Point(advx * w * scaleFactor, advy * h * scaleFactor),
                    definition.numFrames,
                    definition.duration,
                    definition.loop === undefined ? false : definition.loop
                );
            }
            else {
                const units = definition.units ?? 'tiles';
                const scaleFactor = units === 'tiles' ? C.TILE_WIDTH : 1;

                const x = definition.pos[0];
                const y = definition.pos[1];
                const w = definition.size === undefined ? 1 : definition.size[0];
                const h = definition.size === undefined ? 1 : definition.size[1];

                return new Sprite(file, new Rect(x * scaleFactor, y * scaleFactor, w * scaleFactor, h * scaleFactor), new Point(origin_x, origin_y));
            }
        }
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

    drawString(ctx: CanvasRenderingContext2D, position: Point, text: string){
        for(var i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const sprite = this.ascii.getSprite(charCode % 16, Math.floor(charCode / 16), 8, 16);
            sprite.draw(ctx, new Rect(position.x + i * 8, position.y, 8, 16), 0);
        }
    }
    
    drawSmallString(ctx: CanvasRenderingContext2D, position: Point, text: string){
        for(var i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const sprite = this.asciiSmall.getSprite(charCode % 16, Math.floor(charCode / 16), 6, 8);
            sprite.draw(ctx, new Rect(position.x + i * 6, position.y, 6, 8), 0);
        }
    }
}