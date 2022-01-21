import { off } from "process";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import Point from "../common/position/Point";
import { TILE_SIZE_PT, TILE_SIZE } from "./Constants";
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
    public isDisabled: boolean;
    constructor(public definition: ISignalDefinition)
    {
        this.currentSignals = new Map<ECarColor, ETileAnchor>();
    }

    disable(forceInstructions: number){
        this.isDisabled = true;
        for(let color = 0; color < 4; color++) {
            for(let anchor = 0; anchor < 4; anchor++) {
                if((forceInstructions & 1) === 1)
                    this.setInstruction(color, anchor);
                forceInstructions >>= 1;
            }
        }
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
            .subtractWith(ARROW_SIZE / 2, ARROW_SIZE / 2)
            .addWith(this.definition.dx, this.definition.dy);
    }

    draw(ctx: CanvasRenderingContext2D, tile: Point, hub: SpriteSheet, arrows: SpriteSheet) {
        const midpoint = TileAnchorHelper.GetMidpoint({ position: tile }, TILE_SIZE_PT).subtractWith(ARROW_SIZE / 2, ARROW_SIZE / 2); 
        hub.render(ctx,
            midpoint.x + this.definition.dx, midpoint.y + this.definition.dy,
            6, 6,
            this.isDisabled ? 1 : 0, 0);

        const arrowOffsets: number[] = [0,0,0,0];
        for(var [car, anchor] of this.currentSignals.entries()){
            const offset = arrowOffsets[anchor]++;
            const offsetDir = ARROW_DIR[anchor];

            const position = Point.add(midpoint, Point.multiply(offsetDir, (ARROW_SHIFT_HUB + ARROW_SHIFT * offset))).addWith(this.definition.dx, this.definition.dy);
            arrows.render(ctx, position.x, position.y, ARROW_SIZE, ARROW_SIZE, anchor, car);
        }
    }
    
    draw_offgrid(ctx: CanvasRenderingContext2D, position: Point, tileSize: Point, hub: SpriteSheet, arrows: SpriteSheet) {
        const midpoint = position.addWith(Point.multiply(tileSize, 0.5, 0.5)).subtractWith(ARROW_SIZE / 2, ARROW_SIZE / 2); 
        hub.render(ctx, midpoint.x + this.definition.dx, midpoint.y + this.definition.dy,
            6, 6,
            this.isDisabled ? 1 : 0, 0);

        const arrowOffsets: number[] = [0,0,0,0];
        for(var [car, anchor] of this.currentSignals.entries()){
            const offset = arrowOffsets[anchor]++;
            const offsetDir = ARROW_DIR[anchor];

            const position = Point.add(midpoint, Point.multiply(offsetDir, (ARROW_SHIFT_HUB + ARROW_SHIFT * offset))).addWith(this.definition.dx, this.definition.dy);
            arrows.render(ctx, position.x, position.y, ARROW_SIZE, ARROW_SIZE, anchor, car);
        }
    }
}