import gridlockTrackUrl from './gridlocktrack.png';
import carUrl from './cars.png';
import signalArrowUrl from './signal_arrows.png';
import signalHubUrl from './signal_hub.png';
import ctrlpanelUrl from './gridlock_ctrlpanel.png';
import fireUrl from './fire.png';
import ctrlpanelElementUrl from './control_uielements.png';
import spawnRingUrl from './gridlock_spawns.png';
import { AtlasSprite, SpriteAtlas } from '../../common/assets/SpriteAtlas';
import ImageLoader from '../../common/assets/ImageLoader';
import { SpriteSheet } from '../../common/assets/SpriteSheet';
import AssetLoader from '../../common/assets/AssetLoader';
import { SpriteAnimation } from '../../common/assets/SpriteAnimation';
import Point from '../../common/position/Point';
import { ATLAS_WIDTH, TILE_SIZE_PT, TILE_SIZE } from '../Constants';

export default class Assets {
    public trackImageAtlas: SpriteAtlas;
    public carImageAtlas: SpriteAtlas;
    public signalHubSheet: SpriteSheet;
    public signalArrowsImage: SpriteSheet;
    public ctrlPanelBackground: ImageLoader;
    public ctrlPanelElements: SpriteAtlas;
    public spawnRingSheet: SpriteSheet;
    public fire: SpriteAnimation;
    
    constructor(loader: AssetLoader) {
        this.trackImageAtlas = new SpriteAtlas(gridlockTrackUrl, loader.registerAssetLoadCallback());
        this.carImageAtlas = new SpriteAtlas(carUrl, loader.registerAssetLoadCallback());
        this.signalArrowsImage = new SpriteSheet(6, 6, signalArrowUrl, loader.registerAssetLoadCallback());
        this.signalHubSheet = new SpriteSheet(6, 6, signalHubUrl, loader.registerAssetLoadCallback());
        this.ctrlPanelBackground = new ImageLoader(ctrlpanelUrl, loader.registerAssetLoadCallback());
        this.ctrlPanelElements = new SpriteAtlas(ctrlpanelElementUrl, loader.registerAssetLoadCallback());
        this.spawnRingSheet = new SpriteSheet(48, 48, spawnRingUrl, loader.registerAssetLoadCallback());
        this.fire = new SpriteAnimation(new SpriteAtlas(fireUrl, loader.registerAssetLoadCallback()), new Point(0,0), new Point(8, 16), 4);
    }

    getTrackSprite(tileId: number): AtlasSprite {
        const tx = tileId % ATLAS_WIDTH;
        const ty = Math.floor(tileId / ATLAS_WIDTH);
        return this.trackImageAtlas.getSprite(
            new Point(tx * TILE_SIZE, ty * TILE_SIZE),
            TILE_SIZE_PT
        );
    }
}