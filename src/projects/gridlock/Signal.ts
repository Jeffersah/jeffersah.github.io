import { off } from "process";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import Point from "../common/position/Point";
import { TILE_SIZE_PT } from "./Constants";
import ECarColor from "./ECarColor";
import ETileAnchor, { TileAnchorHelper } from "./ETileAnchor";
import { ISignalDefinition } from "./tiles/MapTileDefintion";

const ARROW_SIZE = 6;
const ARROW_SHIFT_HUB = 6;
const ARROW_SHIFT = 3; 

const ARROW_DIR: Point[] = [
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 0),
    new Point(0, -1)
];

export default class Signal {
    private currentSignals: Map<ECarColor, ETileAnchor>;
    constructor(public definition: ISignalDefinition)
    {
        this.currentSignals = new Map<ECarColor, ETileAnchor>();
    }

    getInstruction(car: ECarColor) : ETileAnchor | undefined {
        if(this.currentSignals.has(car)) return this.currentSignals.get(car);
        return undefined;
    }

    setInstruction(car: ECarColor, anchor: ETileAnchor) {
        this.currentSignals.set(car, anchor);
    }
    
    clearInstructions(car ?: ECarColor) {
        if(car === undefined || car === null) {
            this.currentSignals.clear();
        }
        else {
            this.currentSignals.delete(car);
        }
    }

    getRenderPosition(tile: Point): Point {
        return TileAnchorHelper.GetMidpoint({ position: tile }, TILE_SIZE_PT)
            .SubtractWith(ARROW_SIZE / 2, ARROW_SIZE / 2)
            .AddWith(this.definition.dx, this.definition.dy);
    }

    draw(ctx: CanvasRenderingContext2D, tile: Point, hub: HTMLImageElement, arrows: SpriteSheet) {
        const midpoint = TileAnchorHelper.GetMidpoint({ position: tile }, TILE_SIZE_PT).SubtractWith(ARROW_SIZE / 2, ARROW_SIZE / 2); 
        ctx.drawImage(hub, midpoint.x + this.definition.dx, midpoint.y + this.definition.dy);
        const arrowOffsets: number[] = [0,0,0,0];
        for(var [car, anchor] of this.currentSignals.entries()){
            const offset = arrowOffsets[anchor]++;
            const offsetDir = ARROW_DIR[anchor];

            const position = Point.add(midpoint, Point.Multiply(offsetDir, (ARROW_SHIFT_HUB + ARROW_SHIFT * offset))).AddWith(this.definition.dx, this.definition.dy);
            arrows.render(ctx, position.x, position.y, ARROW_SIZE, ARROW_SIZE, anchor, car);
        }
    }
}