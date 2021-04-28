import GameState from "./GameState";
import { AtlasSprite } from "../common/assets/SpriteAtlas";
import ECarColor from "./ECarColor";
import ETileAnchor, { ITilePosition, TileAnchorHelper } from "./ETileAnchor";
import Point from "../common/position/Point";
import Angle from "../common/position/Angle";
import { TILE_SIZE_PT } from "./Constants";
import { any } from "../../LinqLike";
import MapTile from "./tiles/MapTile";
import { PlayingAnimation } from "../common/assets/SpriteAnimation";
import Rand from "../../utils/rand";
import Assets from "./assets";

const TILE_CRASH_MAX_INTERP = 0.4;
const EDGE_CRASH_MAX_INTERP = 0.9;

const MAX_FLAME_RENDER = 4;
const MIN_FLAME_RENDER = 1;

export class Car {
    nextPosition?: ITilePosition;
    parkedAt?: Point;

    private parkAnimationComplete:boolean;

    public crashedAt?: { position: Point, anchor?: ETileAnchor };

    hasPlayedCrashAnimation: boolean;

    flameRenders: { anim: PlayingAnimation, offset: Point }[];

    constructor(public color: ECarColor, public sprite: AtlasSprite, public position: ITilePosition, private assets: Assets) {
        this.nextPosition = undefined;
        this.parkedAt = undefined;
        this.parkAnimationComplete = false;
        this.hasPlayedCrashAnimation = false;
        this.flameRenders = [];
    }

    isCrashed(): boolean {
        return this.crashedAt !== undefined;
    }

    crashHere(anchor?: ETileAnchor) {
        if(!this.isCrashed()) {
            this.startFlames();
        }
        this.crashedAt = { position: this.position.position, anchor };
    }

    crashAt(pos: {position: Point, anchor?: ETileAnchor}) {
        if(!this.isCrashed()) {
            this.startFlames();
        }
        this.crashedAt = pos;
    }

    private FindOutputForAlwaysTurn(state: GameState, facing: ETileAnchor, outputs: ETileAnchor[], direction: number): ETileAnchor {
        if(outputs.length === 1) return outputs[0];
        if(direction === 0) {
            const fwd = TileAnchorHelper.ReverseDirection(facing); 
            if(outputs.indexOf(fwd) !== -1) return fwd;
            return facing;
        }
        else {
            for(let dt = 0; dt < 4; dt++)
            {
                let preffered = <ETileAnchor>((facing + dt * direction)%4);
                if(outputs.indexOf(preffered) !== -1) return preffered;
            }
            return facing;
        }
    }

    private startFlames() {
        const flameCount = Rand.Int(MIN_FLAME_RENDER, MAX_FLAME_RENDER);
        for(let i = 0; i < flameCount; i++) {
            const flame: { anim: PlayingAnimation, offset: Point } = {
                anim: this.assets.fire.play(30, true),
                offset: new Point(Rand.Int(-6, 6) - this.assets.fire.sourceSize.x / 2, Rand.Int(-6, 6) - this.assets.fire.sourceSize.y)
            };
            // Tick a few times, so the flames aren't all in sync
            const ticks = Rand.Int(8);
            for(let tick = 0; tick < ticks; tick++)
                flame.anim.tick();
            this.flameRenders.push(flame);
        }
    }

    public EveryTick() {
        for(const flame of this.flameRenders) {
            flame.anim.tick();
        }
    }

    public LogicTick() {
        if(this.isCrashed() && !this.hasPlayedCrashAnimation) { 
            this.hasPlayedCrashAnimation = true; 
        }
    }

    public CalculateNextPosition(state: GameState): ITilePosition | undefined {
        if(this.isCrashed()) { this.hasPlayedCrashAnimation = true; return undefined; }
        if(this.parkedAt !== undefined) {
            this.parkAnimationComplete = true;
            return undefined;
        }

        const tile = state.map[this.position.position.x][this.position.position.y];
        const validOutputs = tile.definition.connections.allConnections(this.position.anchor);

        const chosen = this.chooseOutputDirection(state, tile, validOutputs);
        if(chosen === undefined){
            // TODO: Check if we can park
            if(tile.definition.isStop) {
                this.parkedAt = this.position.position;
                this.parkAnimationComplete = false;
                if(any(state.cars, c => c !== this && c.parkedAt !== undefined && c.parkedAt.x === this.position.position.x && c.parkedAt.y === this.position.position.y)) {
                    // There's someoene there, crash into them.
                    this.crashHere(this.position.anchor);
                }
            }
            else {
                this.crashHere();
            }
            return undefined;
        }
        return {
            position: Point.add(this.position.position, TileAnchorHelper.AnchorToTileMove(chosen)),
            anchor: TileAnchorHelper.ReverseDirection(chosen)
        };
    }

    private chooseOutputDirection(state: GameState, tile: MapTile, valid: ETileAnchor[]) : ETileAnchor | undefined
    {
        switch(this.color) {
            case ECarColor.Gray_Bounce:
            case ECarColor.Gray_TurnLeft:
            case ECarColor.Gray_TurnRight:
                if(valid.length === 0) 
                    return this.position.anchor;
                else
                {
                    return this.FindOutputForAlwaysTurn(state, this.position.anchor, valid, 
                        this.color === ECarColor.Gray_Bounce ? 0
                        : this.color === ECarColor.Gray_TurnLeft ? 1 : 
                        3);
                }
            default: 
                if(valid.length === 0) return undefined
                else if(valid.length === 1) {
                    return valid[0];
                }
                else {
                    let signalAnchor = tile.TryGetSignal(this.position.anchor, this.color);
                    if (signalAnchor !== null && signalAnchor !== undefined && signalAnchor !== this.position.anchor) return signalAnchor;
                    if (valid.indexOf(TileAnchorHelper.ReverseDirection(this.position.anchor)) !== -1) return TileAnchorHelper.ReverseDirection(this.position.anchor);
                    return undefined;
                }
        }
    }

    public draw(ctx: CanvasRenderingContext2D, interpPercent: number, positionAdjust: Point){
        const fromAnchor = TileAnchorHelper.GetRealPosition(this.position, TILE_SIZE_PT);
        const tileMidpoint = TileAnchorHelper.GetMidpoint(this.position, TILE_SIZE_PT);
        const fromAngle = TileAnchorHelper.GetEntryRotation(this.position.anchor);

        if(this.isCrashed()) {
            let effectiveNext : ITilePosition;
            if(this.nextPosition !== undefined) effectiveNext = this.nextPosition;
            else if(this.crashedAt?.anchor !== undefined) effectiveNext = this.crashedAt as ITilePosition;
            else effectiveNext = {
                position: Point.add(this.position.position, TileAnchorHelper.AnchorToTileMove(TileAnchorHelper.ReverseDirection(this.position.anchor))),
                anchor: this.position.anchor
            };

            const maxInterp = this.crashedAt.anchor === undefined ? TILE_CRASH_MAX_INTERP : EDGE_CRASH_MAX_INTERP;

            const useInterp = this.hasPlayedCrashAnimation ? maxInterp : (interpPercent < maxInterp ? interpPercent : maxInterp);

            const toAnchor = TileAnchorHelper.GetRealPosition(effectiveNext, TILE_SIZE_PT);

            let renderPosition: Point;

            if(this.parkedAt !== undefined) {
                renderPosition = tileMidpoint;
            }
            else {
                renderPosition = Point.Bezier([fromAnchor, tileMidpoint, toAnchor], useInterp);
            }

            renderPosition = renderPosition.AddWith(positionAdjust);

            const exitAngle = TileAnchorHelper.GetEntryRotation(effectiveNext.anchor);

            const rel = Angle.relativeAngle(fromAngle, exitAngle);


            this.sprite.draw(ctx, renderPosition, this.sprite.sourceSize, fromAngle - rel * useInterp);

            if(this.hasPlayedCrashAnimation || interpPercent > useInterp) {
                for(const flame of this.flameRenders) {
                    flame.anim.draw(ctx, Point.add(renderPosition, flame.offset), flame.anim.source.sourceSize);
                }
            }
        }
        else if(this.nextPosition !== undefined) {
            const toAnchor = TileAnchorHelper.GetRealPosition(this.nextPosition, TILE_SIZE_PT);

            const renderPosition = Point.Bezier([fromAnchor, tileMidpoint, toAnchor], interpPercent).AddWith(positionAdjust);

            const exitAngle = TileAnchorHelper.GetEntryRotation(this.nextPosition.anchor);

            const rel = Angle.relativeAngle(fromAngle, exitAngle);

            this.sprite.draw(ctx, renderPosition, this.sprite.sourceSize, fromAngle - rel * interpPercent);
        }
        else if(this.parkedAt !== undefined) {
            if(!this.parkAnimationComplete) {
                const renderPosition = Point.Bezier([fromAnchor, tileMidpoint, tileMidpoint], interpPercent).AddWith(positionAdjust);
                this.sprite.draw(ctx, renderPosition, this.sprite.sourceSize, fromAngle);
            } else {
                this.sprite.draw(ctx, tileMidpoint, this.sprite.sourceSize, fromAngle);
            }
        }
    }
}