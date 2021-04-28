import { AtlasSprite } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import AnchorColisions from "../AnchorColisions";
import Assets from "../assets";
import { Car } from "../Car";
import { TILE_SIZE, TILE_SIZE_PT } from "../Constants";
import ECarColor from "../ECarColor";
import ETileAnchor, { TileAnchorHelper } from "../ETileAnchor";
import Signal from "../Signal";
import { MapTileDefinition } from "./MapTileDefintion";

export default class MapTile { 
    public signals: Signal[];
    public overdrawAnchors: ETileAnchor[];

    constructor(public definition: MapTileDefinition, public image: AtlasSprite, public endpointColor?: ECarColor) {
        this.signals = [];
        for(const signalDef of definition.signals) {
            this.signals.push(new Signal(signalDef));
        }
        this.overdrawAnchors = this.definition.tileId === 3 ? [ ETileAnchor.Left, ETileAnchor.Right ] : [];
    }

    DisableSignal(id: number, forceDisplay: number) {
        this.signals[id].disable(forceDisplay);
    }

    TryGetSignal(from: ETileAnchor, color: ECarColor): ETileAnchor|undefined {
        for(const signal of this.signals) {
            if(signal.definition.inputDirs.indexOf(from) !== -1) {
                return signal.getInstruction(color);
            }
        }
        return undefined;
    }

    CheckColisions(c1: Car, c2: Car): boolean {
        // TODO: what if one of them is undefined?
        if(c1.nextPosition === undefined || c2.nextPosition === undefined) return true;
        let path1 = TileAnchorHelper.GetConnection(c1.position.anchor, TileAnchorHelper.ReverseDirection(c1.nextPosition.anchor));
        let path2 = TileAnchorHelper.GetConnection(c2.position.anchor, TileAnchorHelper.ReverseDirection(c2.nextPosition.anchor));

        for(const [from, hit] of (this.definition.isCrossover ? AnchorColisions.crossoverColisions : AnchorColisions.colisions)) {
            if(from === path1) {
                if((hit & path2) > 0) return true;
            }
            if(from === path2) {
                if((hit & path1) > 0) return true;
            }
        }
        return false;
    }

    GetPositionAdjust(from: ETileAnchor, to: ETileAnchor | undefined, interp: number): Point {
        // Not the best way of doing this, but hey, it works.
        if(this.definition.tileId === 3) {
            if((from === ETileAnchor.Left || from === ETileAnchor.Right) && (to === ETileAnchor.Left || to === ETileAnchor.Right)) {
                let shiftStrength = interp * 2;
                if(shiftStrength > 1) {
                    shiftStrength = 1 - (shiftStrength % 1);
                }

                shiftStrength = Math.pow(shiftStrength, 0.5);

                // shiftStrength is [0, 1], 0 when interp approaches 0 or 1, and 1 when interp is 0.5 (Triangle wave)

                return new Point(0, - shiftStrength * 5);
            }
        }
        return new Point(0,0);
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, assets: Assets) {
        this.image.draw(ctx, new Point(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE_PT);
        for(const signal of this.signals) {
            signal.draw(ctx, new Point(x, y), assets.signalHubSheet, assets.signalArrowsImage);
        }

        if(this.definition.isStop && this.endpointColor !== undefined && this.endpointColor !== null) {
            const center_offset = (TILE_SIZE - assets.spawnRingSheet.spriteWidth) / 2;
            assets.spawnRingSheet.render(ctx, 
                x * TILE_SIZE + center_offset, 
                y * TILE_SIZE + center_offset, 
                assets.spawnRingSheet.spriteWidth, 
                assets.spawnRingSheet.spriteHeight, 
                this.endpointColor,
                1);
        }
    }

    overdraw(ctx: CanvasRenderingContext2D, x: number, y: number, assets: Assets) {
        if(this.definition.tileId !== 3) return;

        assets.getTrackSprite(39).draw(ctx, new Point(x * TILE_SIZE, y * TILE_SIZE), TILE_SIZE_PT);
        
    }

    draw_offgrid(ctx: CanvasRenderingContext2D, x: number, y: number, tileSize: number, assets: Assets) {
        this.image.draw(ctx, new Point(x, y), new Point(tileSize, tileSize));
        for(const signal of this.signals) {
            signal.draw_offgrid(ctx, new Point(x, y), new Point(tileSize, tileSize), assets.signalHubSheet, assets.signalArrowsImage);
        }
    }
}