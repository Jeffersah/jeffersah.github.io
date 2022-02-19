import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import Entity from "../Entity";
import { SimpleCell } from "./HexCell";
import * as C from '../Constants';
import GameState from "../GameState";
import TileAttackInfo from "../attackInfos/TileAttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";

export type TrapDamage = 1|3|5;
const trapSprites: { [key in TrapDamage]: Point } = {
    1: new Point(0, 6),
    3: new Point(0, 7),
    5: new Point(0, 8)
}
const trapCooldown: { [key in TrapDamage]: number } = {
    1: 0,
    3: 1,
    5: 2
}

export default class Trap extends SimpleCell {
    public static TypeID = 5;

    public damage: TrapDamage;
    public state: 'wait'|'prep'|'fire' = 'wait';
    private cooldown = 0;
    private assets: Assets;

    constructor(assets: Assets, damage: TrapDamage) {
        super(Trap.TypeID, assets, trapSprites[damage], true, false);
        this.assets = assets;
        this.damage = damage;
        this.state = 'wait';
        this.cooldown = trapCooldown[damage];
    }

    override OnEntityStep(entity: Entity): void {
        if(this.state === 'wait') {
            const spritePos = trapSprites[this.damage];
            super.renderable = new Sprite(this.assets.tiles.image, new Rect((spritePos.x+1) * C.TILE_WIDTH, spritePos.y * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT));
        }
    }

    override AfterEnemyTurn(state: GameState, x: number, y: number): IAttackInfo[] {
        if(this.state === 'wait'){
            const entityHere = state.entityAt(new Point(x, y));
            if(entityHere !== undefined) {
                this.state = 'prep';
            }
        }
        
        if(this.state === 'prep' && this.cooldown === 0) {
            this.state = 'fire';
            const spritePos = trapSprites[this.damage];
            super.renderable = new Sprite(this.assets.tiles.image, new Rect((spritePos.x+2) * C.TILE_WIDTH, spritePos.y * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT));
            const entityHere = state.entityAt(new Point(x, y));
            if(entityHere !== undefined) {
                return [
                    new TileAttackInfo(new Point(x, y), [{ damage: this.damage, positions: [new Point(x,y)] }], 0, this.assets.getImpactAnimation(1))
                ]
            }
        }
        else if(this.state === 'prep') { this.cooldown --; }
        return [];
    }
}
