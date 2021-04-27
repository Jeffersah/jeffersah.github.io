import gridlockTrackUrl from './gridlocktrack.png';
import carUrl from './cars.png';
import signalArrowUrl from './signal_arrows.png';
import signalHubUrl from './signal_hub.png';
import ctrlpanelUrl from './gridlock_ctrlpanel.png';
import ctrlpanelElementUrl from './control_uielements.png';
import { SpriteAtlas } from '../../common/assets/SpriteAtlas';
import ImageLoader from '../../common/assets/ImageLoader';
import { SpriteSheet } from '../../common/assets/SpriteSheet';
import AssetLoader from '../../common/assets/AssetLoader';

export default class Assets {
    public trackImageAtlas: SpriteAtlas;
    public carImageAtlas: SpriteAtlas;
    public signalHubImage: ImageLoader;
    public signalArrowsImage: SpriteSheet;
    public ctrlPanelBackground: ImageLoader;
    public ctrlPanelElements: SpriteAtlas;
    
    constructor(loader: AssetLoader) {
        this.trackImageAtlas = new SpriteAtlas(gridlockTrackUrl, loader.registerAssetLoadCallback());
        this.carImageAtlas = new SpriteAtlas(carUrl, loader.registerAssetLoadCallback());
        this.signalArrowsImage = new SpriteSheet(6, 6, signalArrowUrl, loader.registerAssetLoadCallback());
        this.signalHubImage = new ImageLoader(signalHubUrl, loader.registerAssetLoadCallback());
        this.ctrlPanelBackground = new ImageLoader(ctrlpanelUrl, loader.registerAssetLoadCallback());
        this.ctrlPanelElements = new SpriteAtlas(ctrlpanelElementUrl, loader.registerAssetLoadCallback());
    }
}