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
import Sprite from "../common/rendering/Sprite";

export default class GameState {

    public player: Player;
    public enemies: Entity[] = [];

    public tiles: HexArray<HexCell>;
    public entities: HexArray<Entity>;
    public currentFloor: number;
    
    constructor(private assets: Assets, size: number, floorNum: number, generator: IMapGen) {
        this.entities = new HexArray<Entity>(size, null);
        this.changeFloor(floorNum, generator);
        

        this.player = new Player(assets, C.PLAYER_START_POSITION);
        this.entities.set(this.player, C.PLAYER_START_POSITION.x, C.PLAYER_START_POSITION.y);
    }

    moveEntity(entity: Entity, to: Point) {
        this.entities.set(null, entity.position);
        this.entities.set(entity, to);
        entity.position = to;
    }

    changeFloor(floorNum: number, generator: IMapGen) {
        this.entities = new HexArray<Entity>(this.entities.size(), null);
        generator.generateMap(this.assets, floorNum, this);
        this.currentFloor = floorNum;
        this.tiles.iterate((x, y, tile) =>{
            tile.AfterWorldLoad(this, new Point(x, y));
        });
        this.entities.set(this.player, C.PLAYER_START_POSITION);
    }

    draw(ctx: CanvasRenderingContext2D, excludeEntities?: Entity[]) {
        new Sprite(this.assets.floor_and_digits.image, new Rect(0, 0, 41, 13)).draw(ctx, new Rect(0, 0, 41, 13), 0);
        this.assets.drawNumber(ctx, new Point(41, 0), this.currentFloor);

        this.tiles.iterate((x, y, cell) => {
            cell.draw(ctx, this, new Point(x, y));
        });

        this.entities.iterate((x, y, entity) => {
            if(entity !== null && entity !== undefined) {
                if(excludeEntities === undefined || !excludeEntities.includes(entity)) {
                    entity.draw(ctx);
                }
            }
        });
    }
}