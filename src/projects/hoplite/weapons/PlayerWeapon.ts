import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import * as C from '../Constants';
import Player from "../entities/Player";
import GameState from "../GameState";

export default abstract class PlayerWeapon {
    public name: string;
    public description: string;
    public iconImage: IRenderable;
    public sprite: IRenderable;

    constructor(public type: 'primary'|'secondary', assets: Assets, artTile: Point) {
        if(this.type === 'primary') {

            this.sprite = new Sprite(
                assets.tiles.image, 
                new Rect(artTile.x * C.TILE_WIDTH, artTile.y * C.TILE_HEIGHT, C.TILE_WIDTH / 2, C.TILE_HEIGHT));

            this.iconImage = new Sprite(
                assets.tiles.image, 
                new Rect(artTile.x * C.TILE_WIDTH + C.TILE_WIDTH / 2, artTile.y * C.TILE_HEIGHT, C.TILE_WIDTH / 2, C.TILE_HEIGHT));
        }
        else {

            this.sprite = new Sprite(
                assets.tiles.image, 
                new Rect(artTile.x * C.TILE_WIDTH + C.TILE_WIDTH / 2, artTile.y * C.TILE_HEIGHT, C.TILE_WIDTH / 2, C.TILE_HEIGHT));

            this.iconImage = new Sprite(
                assets.tiles.image, 
                new Rect(artTile.x * C.TILE_WIDTH, artTile.y * C.TILE_HEIGHT, C.TILE_WIDTH / 2, C.TILE_HEIGHT));
        }
    }
    abstract enableAdditionalMoves(state: GameState, player: Player): {dest: Point, forceMove: Point}[];
    abstract getBeforeMoveAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[];
    abstract getAfterMoveAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[];
}
