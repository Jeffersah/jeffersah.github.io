import Point from "../../common/position/Point";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import OffsetRenderable from '../../common/rendering/OffsetRenderable';
import Assets from "../Assets";
import IAttackInfo from "../attackInfos/IAttackInfo";
import RadialAreaAttackInfo from "../attackInfos/RadialAreaAttackInfo";
import TileAttackInfo from "../attackInfos/TileAttackInfo";
import * as C from "../Constants";
import { AllDirections, Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import Enemy from "./Enemy";

export default class BlueBurstDisc extends Enemy {
    static sprite: IRenderable;
    static explodingSprite: IRenderable;
    static impactAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        BlueBurstDisc.sprite = assets.getAsset('blue_sphere').getRenderable();
        BlueBurstDisc.explodingSprite = assets.getAsset('blue_sphere_exploding').getRenderable();
        BlueBurstDisc.impactAnimation = assets.getAsset('impact_blue_magic');
    }

    isExploding: boolean;
    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 2;
        this.isFlying = true;
        this.isExploding = false;

        this.goldValue = 0;
    }

    getAttacks(state: GameState): IAttackInfo[] {
        if(this.isExploding) {
            this.hp = 0
            return [new RadialAreaAttackInfo(this.position, [{radius: 1, damage: 2}], 8, BlueBurstDisc.impactAnimation, true)];
        }

        this.isExploding = true;
        return [];
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {
        return this.position;
    }

    override getRenderable(): IRenderable {
        if(this.isExploding) {
            return BlueBurstDisc.explodingSprite;
        }
        return BlueBurstDisc.sprite;
    }
}