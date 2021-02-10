import Point from "../../common/position/Point";
import GameState from "../GameState";
import { Ship } from "../Ship";
import BroadsideAI from "./BroadsideAI";
import FigherAI from "./FighterAI";
import { DebugCross, DebugLine, DebugPlus, DebugPoint, DebugRay, IDebugMarker } from "./IDebugMarker";

export abstract class ShipAI {
    markers: IDebugMarker[];
    doDebug: boolean;
    constructor(args ?: { debug?: boolean }) {
        this.markers = [];
        this.doDebug = args?.debug ?? false;
    }

    abstract TickAI(gs: GameState, ship: Ship): {tgtVel: number, tgtHeading: number};

    debug(debug: IDebugMarker) {
        if(!this.doDebug) return;
        this.markers.push(debug);
    }
    debugPoint(pt: Point, color?:string, radius?:number) {
        this.debug(new DebugPoint(pt, color, radius));
    }
    debugCross(pt: Point, color?:string, radius?:number) {
        this.debug(new DebugCross(pt, color, radius));
    }
    debugPlus(pt: Point, color?:string, radius?:number) {
        this.debug(new DebugPlus(pt, color, radius));
    }
    debugRay(pt: Point, angle: number, color?:string, dist?:number) {
        this.debug(new DebugRay(pt, angle, color, dist));
    }
    debugLine(pt: Point, pt2: Point, color?:string) {
        this.debug(new DebugLine(pt, pt2, color));
    }

    debugDraw(ctx: CanvasRenderingContext2D, ship: Ship){
        if(this.markers.length === 0) return;
        for(let i = 0; i < this.markers.length; i++) {
            this.markers[i].draw(ctx);
        }
        this.markers = [];
    }
}