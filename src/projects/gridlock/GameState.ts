import { any, customGroupBy, findMin, groupBy } from "../../LinqLike";
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

        let allEndpoints: (ECarColor | undefined)[] = new Array(level.mapdata.length);
        for(const end of level.endpoints) {
            allEndpoints[end.position.x + end.position.y * level.width] = end.color;
        }

        for(let i = 0; i < level.mapdata.length; i++) {
            let x = i % level.width;
            let y = Math.floor(i / level.width);
            const definition = allMapTileDefinitions[level.mapdata[i]];
            if(definition === null) {
                this.map[x][y] = null;
            }
            else {
                this.map[x][y] = new MapTile(definition, assets.getTrackSprite(definition.tileId), allEndpoints[i]);
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
                    this.assets));
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
                    this.assets));
            }
        }
        this.updateCars();
    }

    public updateCars() {
        // Update all cars next positions
        for(const car of this.cars) {
            car.LogicTick();

            if(car.isCrashed()) continue;
            if(car.nextPosition !== undefined) {
                car.position = car.nextPosition;
            }
            car.nextPosition = car.CalculateNextPosition(this);
        }

        for(const [pos, checkColis] of customGroupBy(this.cars, car => car.position.position, (p1, p2) => p1.x === p2.x && p1.y === p2.y)) {
            for(let i = 0; i < checkColis.length; i++) {
                for(let j = i + 1; j < checkColis.length; j++) {
                    if(this.map[pos.x][pos.y].CheckColisions(checkColis[i], checkColis[j])) {
                        checkColis[i].crashHere();
                        checkColis[j].crashHere();
                    }
                }
            }
        }
        
        for(const car of this.cars) {
            if(car.nextPosition === undefined) continue;
            const equivPoint = TileAnchorHelper.EquivalentPosition(car.nextPosition);

            for(const otherCar of this.cars) {
                if(car === otherCar || otherCar.nextPosition === undefined) continue;
                if(equivPoint.anchor === otherCar.nextPosition.anchor && equivPoint.position.Equals(otherCar.nextPosition.position)) {
                    car.crashAt(car.nextPosition);
                    otherCar.crashAt(otherCar.nextPosition);
                }
            }
        }

    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, interpPercent: number) {
        for(const car of this.cars) {
            car.EveryTick();
        }

        for(let dx = 0; dx < this.map.length; dx++) {
            for(let dy = 0; dy < this.map[dx].length; dy++) {
                if(this.map[dx][dy] !== null) {
                    this.map[dx][dy].draw(ctx, dx, dy, this.assets);
                }
            }
        }

        const overdrawCars: Car[] = [];

        for(const car of this.cars) {
            const mapTile = this.map[car.position.position.x][car.position.position.y];
            const fromAnchor = car.position.anchor;
            const toAnchor = car.nextPosition?.anchor;
            const checkOverdrawPos = [
                car.position, car.nextPosition,
                TileAnchorHelper.EquivalentPosition(car.position), TileAnchorHelper.EquivalentPosition(car.nextPosition)
            ];

            if(any(checkOverdrawPos, coords => 
                coords !== undefined && this.map[coords.position.x][coords.position.y].overdrawAnchors.indexOf(coords.anchor) !== -1
            ))
            {
                overdrawCars.push(car);
                continue;
            }

            car.draw(ctx, interpPercent, mapTile.GetPositionAdjust(fromAnchor, toAnchor, interpPercent));
        }
        

        for(let dx = 0; dx < this.map.length; dx++) {
            for(let dy = 0; dy < this.map[dx].length; dy++) {
                if(this.map[dx][dy] !== null) {
                    this.map[dx][dy].overdraw(ctx, dx, dy, this.assets);
                }
            }
        }
        
        for(const car of overdrawCars) {
            const mapTile = this.map[car.position.position.x][car.position.position.y];
            const fromAnchor = car.position.anchor;
            const toAnchor = car.nextPosition?.anchor;
            car.draw(ctx, interpPercent, mapTile.GetPositionAdjust(fromAnchor, toAnchor, interpPercent));
        }
    }
}