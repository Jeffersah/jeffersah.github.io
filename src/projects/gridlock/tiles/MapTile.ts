import { AtlasSprite } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import Assets from "../assets";
import { TILE_SIZE, TILE_SIZE_PT } from "../Constants";
import ECarColor from "../ECarColor";
import ETileAnchor from "../ETileAnchor";
import Signal from "../Signal";
import { MapTileDefinition } from "./MapTileDefintion";

export default class MapTile { 
    public signals: Signal[];

    constructor(public definition: MapTileDefinition, public image: AtlasSprite) {
        this.signals = [];
        for(const signalDef of definition.signals) {
            this.signals.push(new Signal(signalDef));
        }
    }

    TryGetSignal(from: ETileAnchor, color: ECarColor): ETileAnchor|undefined {
        for(const signal of this.signals) {
            if(signal.definition.inputDirs.indexOf(from) !== -1) {
                return signal.getInstruction(color);
            }
        }
        return undefined;
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, assets: Assets) {
        this.image.draw(ctx, new Point(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE_PT);
        for(const signal of this.signals) {
            signal.draw(ctx, new Point(x, y), assets.signalHubImage.image, assets.signalArrowsImage);
        }
    }
}