import { findMin } from "../../LinqLike";
import { AtlasSprite, SpriteAtlas } from "../common/assets/SpriteAtlas";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import Angle from "../common/position/Angle";
import Point from "../common/position/Point";
import Assets from "./assets";
import { Car } from "./Car";
import { ATLAS_WIDTH, CAR_SIZE, CAR_SIZE_PT, TILE_SIZE, TILE_SIZE_PT } from "./Constants";
import ECarColor from "./ECarColor";
import ETileAnchor, { ITilePosition, TileAnchorHelper } from "./ETileAnchor";
import ILevelData from "./ILevelData";
import SignalCtrlPanel from "./signalCtrl/signalCtrlPanel";
import MapTile from "./tiles/MapTile";
import allMapTileDefinitions, { MapTileDefinition } from "./tiles/MapTileDefintion";


export default class GameState {
    map: (MapTile | null)[][]
    cars: Car[];

    constructor(private level: ILevelData, private canvas: HTMLCanvasElement, public assets: Assets) {
        this.map = [];
        for(let c = 0; c < level.width; c++) {
            let col = [];
            for(let r = 0; r < level.height; r++) {
                col.push(null);
            }
            this.map.push(col);
        }

        const tileSprites = [];
        for(let i = 0; i < allMapTileDefinitions.length; i++) {
            const tx = i % ATLAS_WIDTH;
            const ty = Math.floor(i / ATLAS_WIDTH);
            tileSprites.push(allMapTileDefinitions[i] === null ? null : assets.trackImageAtlas.getSprite(
                new Point(tx * TILE_SIZE, ty * TILE_SIZE),
                new Point(TILE_SIZE, TILE_SIZE)
            ));
        }

        for(let i = 0; i < level.mapdata.length; i++) {
            let x = i % level.width;
            let y = Math.floor(i / level.width);
            const definition = allMapTileDefinitions[level.mapdata[i]];
            if(definition === null) {
                this.map[x][y] = null;
            }
            else {
                this.map[x][y] = new MapTile(definition, tileSprites[definition.tileId]);
            }
        }

        this.ResetLevel();
    }

    public tryGetOverlay(clickLocation: Point, cvsScaleFactor: number): SignalCtrlPanel | undefined {
        const tilePt = new Point(Math.floor(clickLocation.x / TILE_SIZE), Math.floor(clickLocation.y / TILE_SIZE));
        const tile = this.map[tilePt.x][tilePt.y];
        if(tile === undefined || tile === null || tile.signals.length === 0) return undefined;
        const nearestSignal = findMin(tile.signals, signal => Point.subtract(signal.getRenderPosition(tilePt), clickLocation).LengthSq());

        const preferredRenderLocation = new Point(tilePt.x * TILE_SIZE + TILE_SIZE, tilePt.y * TILE_SIZE);
        if(this.canvas.width / cvsScaleFactor - preferredRenderLocation.x < this.assets.ctrlPanelBackground.image.width) {
            // Move to left side
            preferredRenderLocation.x = tilePt.x * TILE_SIZE - this.assets.ctrlPanelBackground.image.width;
        }

        if(this.canvas.height / cvsScaleFactor - preferredRenderLocation.y < this.assets.ctrlPanelBackground.image.height) {
            // Shift up to fit
            preferredRenderLocation.y = this.canvas.height / cvsScaleFactor - this.assets.ctrlPanelBackground.image.height;
        }

        return new SignalCtrlPanel(tile, nearestSignal, this.assets, preferredRenderLocation.x, preferredRenderLocation.y);
    }

    public ResetLevel() {
        this.cars = [];
        for(const spawn of this.level.spawns) {
            if(spawn.color >= 0) {
                this.cars.push(new Car(
                    spawn.color, 
                    this.assets.carImageAtlas.getSprite(
                        new Point(CAR_SIZE * (spawn.color as number), 0),
                        CAR_SIZE_PT,
                        new Point(0.5, 0.5)
                    ), 
                    TileAnchorHelper.EquivalentPosition({
                        position: new Point(spawn.position.x, spawn.position.y),
                        anchor: spawn.direction
                    }), 
                    false));
            }
            else {
                this.cars.push(new Car(
                    spawn.color, 
                    this.assets.carImageAtlas.getSprite(
                        new Point(CAR_SIZE * (3 -(spawn.color as number)), 0),
                        CAR_SIZE_PT,
                        new Point(0.5, 0.5)
                    ), 
                    TileAnchorHelper.EquivalentPosition({
                        position: new Point(spawn.position.x, spawn.position.y),
                        anchor: spawn.direction
                    }), 
                    false));
            }
        }
        this.updateCars();
    }

    public updateCars() {
        // Update all cars next positions
        for(const car of this.cars) {
            if(car.isCrashed) continue;
            if(car.nextPosition !== undefined) {
                car.position = car.nextPosition;
            }
            car.nextPosition = car.CalculateNextPosition(this);
        }
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, interpPercent: number) {
        for(let dx = 0; dx < this.map.length; dx++) {
            for(let dy = 0; dy < this.map[dx].length; dy++) {
                if(this.map[dx][dy] !== null) {
                    this.map[dx][dy].draw(ctx, dx, dy, this.assets);
                }
            }
        }

        for(const car of this.cars) {
            car.draw(ctx, interpPercent);
        }
    }
}