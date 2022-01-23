import Point from "../common/position/Point";
import Assets from "./Assets";
import Player from "./entities/Player";
import HexArray from "./HexArray";
import HexCell from "./HexCell";
import IMapGen from "./mapGen/IMapGen";
import * as C from "./Constants";
import Entity from "./Entity";
import { HexToPixel } from "./Hex";
import Rect from "../common/position/Rectangle";

export default class GameState {

    public player: Player;

    public tiles: HexArray<HexCell>;
    public entities: HexArray<Entity>;
    
    constructor(private assets: Assets, size: number, floorNum: number, generator: IMapGen) {
        this.entities = new HexArray<Entity>(size, null);
        this.changeFloor(floorNum, generator);

        this.player = new Player(assets, C.PLAYER_START_POSITION);
        this.entities.set(this.player, C.PLAYER_START_POSITION.x, C.PLAYER_START_POSITION.y);
    }

    changeFloor(floorNum: number, generator: IMapGen) {
        this.entities = new HexArray<Entity>(this.entities.size(), null);
        generator.generateMap(this.assets, floorNum, this);
        this.tiles.iterate((x, y, tile) =>{
            tile.AfterWorldLoad(this, new Point(x, y));
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.tiles.iterate((x, y, cell) => {
            cell.draw(ctx, this, new Point(x, y));
        });

        this.entities.iterate((x, y, entity) => {
            if(entity !== null && entity !== undefined) {
                entity.draw(ctx);
            }
        });
    }
}