import Point from "../common/position/Point";
import Assets from "./Assets";
import Player from "./entities/Player";
import HexArray from "./HexArray";
import HexCell from "./tiles/HexCell";
import IMapGen from "./mapGen/IMapGen";
import * as C from "./Constants";
import Entity from "./Entity";
import { HexToPixel } from "./Hex";
import Rect from "../common/position/Rectangle";
import Sprite from "../common/rendering/Sprite";
import Enemy from "./entities/Enemy";
import IFeature from "./features/IFeature";
import Cell from "../rpgt/world/Cell";

const regions = [
    { region: 0, from: 0, to: 13 },
    { region: 1, from: 13, to: -1 },
]

export default class GameState {

    public player: Player;
    public enemies: Enemy[] = [];

    public tiles: HexArray<HexCell>;
    public features: HexArray<IFeature | undefined>;
    public currentFloor: number;
    public displayFloor: number;
    public regionId: number;

    public gold: number;

    public renderTickNumber: number;

    public brokenGems: {[floor: number]: boolean} = {};
    
    constructor(private assets: Assets, size: number, floorNum: number, generator: IMapGen) {
        this.changeFloor(floorNum, generator);
        this.regionId = 0;

        this.player = new Player(assets, C.PLAYER_START_POSITION);
        this.gold = 0;

        this.renderTickNumber = 0;
    }

    entityAt(to: Point) {
        return [this.player, ...this.enemies].find(e => e.position.equals(to));
    }

    isValidMove(to: Point, flying: boolean) {
        const isValidTile = this.tiles.isInBounds(to.x, to.y) && 
            (this.tiles.get(to).isPathable || flying);
        if(!isValidTile) return false;
        if(to.equals(this.player.position)) return false;
        return !this.enemies.some(e => e.position.equals(to));
    }

    isValidMoveIgnorePlayer(to: Point, flying: boolean) {
        const isValidTile = this.tiles.isInBounds(to.x, to.y) && 
            (this.tiles.get(to).isPathable || flying);
        if(!isValidTile) return false;
        return !this.enemies.some(e => e.position.equals(to));
    }

    isValidMoveIgnoreEnemies(to: Point, flying: boolean) {
        const isValidTile = this.tiles.isInBounds(to.x, to.y) && 
            (this.tiles.get(to).isPathable || flying);
        if(!isValidTile) return false;
        return !to.equals(this.player.position);
    }

    changeFloor(floorNum: number, generator: IMapGen) {
        this.enemies = [];
        generator.generateMap(this.assets, floorNum, this);
        this.currentFloor = floorNum;
        this.setCorrectRegion();
        this.tiles.iterate((x, y, tile) =>{
            tile.AfterWorldLoad(this, new Point(x, y));
        });
    }

    private setCorrectRegion(){
        for(const region of regions) {
            if(this.currentFloor >= region.from && (this.currentFloor < region.to || region.to === -1 )) {
                this.regionId = region.region;
                this.displayFloor = this.currentFloor - region.from + 1;
                return;
            }
        }
    }

    getCells(predicate: (point: Point, tile: HexCell, feature: IFeature) => boolean) {
        let results: Point[] = [];
        this.tiles.iterate((x, y, cell) => {
            const pt = new Point(x,y);
            const feature = this.features.get(pt);
            if(predicate(pt, cell, feature)) {
                results.push(pt);
            }
        });
        return results;
    }

    draw(ctx: CanvasRenderingContext2D, excludeEntities?: Entity[]) {
        new Sprite(this.assets.floor_and_digits.image, new Rect(0, 13*this.regionId, 41, 13)).draw(ctx, new Rect(0, 0, 41, 13), 0);
        this.assets.drawNumber(ctx, new Point(42, 0), this.displayFloor, this.regionId);

        new Sprite(this.assets.floor_and_digits.image, new Rect(0, 13*3, 41, 13)).draw(ctx, new Rect(0, 14, 41, 13), 0);
        this.assets.drawNumber(ctx, new Point(42, 14), this.gold, 3);

        this.tiles.iterate((x, y, cell) => {
            cell.draw(ctx, this, new Point(x, y));
        });
        
        this.features.iterate((x, y, feat) => {
            feat?.draw(ctx, this, new Point(x, y));
        });

        [this.player, ...this.enemies].forEach(entity => {
            if(excludeEntities && excludeEntities.includes(entity)) {
                return;
            }
            entity.draw(ctx);
            if(entity.hp != entity.maxHp){
                this.assets.hpRenderer.draw(ctx, entity.position, entity.hp, entity.maxHp);
            }
        });

        this.renderTickNumber ++;
    }
}