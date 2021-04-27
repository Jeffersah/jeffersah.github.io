import GameState from "./GameState";
import { AtlasSprite } from "../common/assets/SpriteAtlas";
import ECarColor from "./ECarColor";
import ETileAnchor, { ITilePosition, TileAnchorHelper } from "./ETileAnchor";
import Point from "../common/position/Point";
import Angle from "../common/position/Angle";
import { TILE_SIZE_PT } from "./Constants";
import { any } from "../../LinqLike";
import MapTile from "./tiles/MapTile";

export class Car {
    nextPosition?: ITilePosition;
    parkedAt?: Point;
    private parkAnimationComplete:boolean;

    constructor(public color: ECarColor, public sprite: AtlasSprite, public position: ITilePosition, public isCrashed: boolean) {
        this.nextPosition = undefined;
        this.parkedAt = undefined;
        this.parkAnimationComplete = false;
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

    public CalculateNextPosition(state: GameState): ITilePosition | undefined {
        if(this.isCrashed) return undefined;
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
                    this.isCrashed = true;
                }
            }
            else {
                // Crash!
                this.isCrashed = true;
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
                // TODO: respect signals
                if(valid.length === 0) return undefined
                else if(valid.length === 1) {
                    return valid[0];
                }
                else {
                    let signalAnchor = tile.TryGetSignal(this.position.anchor, this.color);
                    if (signalAnchor !== null && signalAnchor !== undefined) return signalAnchor;
                    return valid[Math.floor(Math.random() * valid.length)];
                }
        }
    }

    public draw(ctx: CanvasRenderingContext2D, interpPercent: number){
        const fromAnchor = TileAnchorHelper.GetRealPosition(this.position, TILE_SIZE_PT);
        const tileMidpoint = TileAnchorHelper.GetMidpoint(this.position, TILE_SIZE_PT);
        const fromAngle = TileAnchorHelper.GetEntryRotation(this.position.anchor);

        if(this.isCrashed) {
            const effectiveNext = this.nextPosition ?? {
                position: Point.add(this.position.position, TileAnchorHelper.AnchorToTileMove(TileAnchorHelper.ReverseDirection(this.position.anchor))),
                anchor: this.position.anchor
            };

            const useInterp = interpPercent < 0.5 ? interpPercent : 0.5;

            const toAnchor = TileAnchorHelper.GetRealPosition(effectiveNext, TILE_SIZE_PT);

            const renderPosition = Point.Bezier([fromAnchor, tileMidpoint, toAnchor], useInterp);

            const exitAngle = TileAnchorHelper.GetEntryRotation(effectiveNext.anchor);

            const rel = Angle.relativeAngle(fromAngle, exitAngle);

            this.sprite.draw(ctx, renderPosition, this.sprite.sourceSize, fromAngle - rel * useInterp);
        }
        else if(this.nextPosition !== undefined) {
            const toAnchor = TileAnchorHelper.GetRealPosition(this.nextPosition, TILE_SIZE_PT);

            const renderPosition = Point.Bezier([fromAnchor, tileMidpoint, toAnchor], interpPercent);

            const exitAngle = TileAnchorHelper.GetEntryRotation(this.nextPosition.anchor);

            const rel = Angle.relativeAngle(fromAngle, exitAngle);

            this.sprite.draw(ctx, renderPosition, this.sprite.sourceSize, fromAngle - rel * interpPercent);
        }
        else if(this.parkedAt !== undefined) {
            if(!this.parkAnimationComplete) {
                const renderPosition = Point.Bezier([fromAnchor, tileMidpoint, tileMidpoint], interpPercent);
                this.sprite.draw(ctx, renderPosition, this.sprite.sourceSize, fromAngle);
            } else {
                this.sprite.draw(ctx, tileMidpoint, this.sprite.sourceSize, fromAngle);
            }
        }
    }
}