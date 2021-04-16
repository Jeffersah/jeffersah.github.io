import { AtlasSprite, SpriteAtlas } from "../common/assets/SpriteAtlas";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import Angle from "../common/position/Angle";
import Point from "../common/position/Point";
import { Car } from "./Car";
import ECarColor from "./ECarColor";
import ETileAnchor, { ITilePosition, TileAnchorHelper } from "./ETileAnchor";
import ILevelData from "./ILevelData";
import allMapTiles, { MapTile } from "./tiles/MapTile";

const TILE_SIZE = 48;
const TILE_SIZE_PT = new Point(TILE_SIZE, TILE_SIZE);
const ATLAS_WIDTH = 6;

const CAR_SIZE = 18;
const CAR_SIZE_PT = new Point(CAR_SIZE, CAR_SIZE);

export default class GameState {
    map: (MapTile | null)[][]
    tileSprites: AtlasSprite[];
    cars: Car[];

    constructor(private level: ILevelData, public tileAtlas: SpriteAtlas, public carAtlas: SpriteAtlas) {
        this.map = [];
        for(let c = 0; c < level.width; c++) {
            let col = [];
            for(let r = 0; r < level.height; r++) {
                col.push(null);
            }
            this.map.push(col);
        }

        for(let i = 0; i < level.mapdata.length; i++) {
            let x = i % level.width;
            let y = Math.floor(i / level.width);
            this.map[x][y] = allMapTiles[level.mapdata[i]];
        }

        this.tileSprites = [];
        for(let i = 0; i < allMapTiles.length; i++) {
            const tx = i % ATLAS_WIDTH;
            const ty = Math.floor(i / ATLAS_WIDTH);
            this.tileSprites.push(allMapTiles[i] === null ? null : tileAtlas.getSprite(
                new Point(tx * TILE_SIZE, ty * TILE_SIZE),
                new Point(TILE_SIZE, TILE_SIZE)
            ));
        }
        this.ResetLevel();
    }

    public ResetLevel() {
        this.cars = [];
        for(const spawn of this.level.spawns) {
            if(spawn.color !== ECarColor.Gray) {
                this.cars.push(new Car(
                    spawn.color, 
                    this.carAtlas.getSprite(
                        new Point(CAR_SIZE * (spawn.color as number), 0),
                        CAR_SIZE_PT,
                        new Point(0.5, 0.5)
                    ), 
                    {
                        position: new Point(spawn.position.x, spawn.position.y),
                        anchor: ETileAnchor.Center
                    }, 
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
            car.nextPosition = this.CalculateCarNextPosition(car);
        }
    }

    public CalculateCarNextPosition(c: Car): ITilePosition | undefined {
        const tile = this.map[c.position.position.x][c.position.position.y];
        const validOutputs = tile.connections.allConnections(c.position.anchor);
        if(validOutputs.length === 0) c.isCrashed = true;
        else {
            const chosenOutput = validOutputs[Math.floor(Math.random() * validOutputs.length)];
            return {
                position: Point.add(c.position.position, TileAnchorHelper.AnchorToTileMove(chosenOutput)),
                anchor: TileAnchorHelper.ReverseDirection(chosenOutput)
            };
        }
        return undefined;
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, interpPercent: number) {
        for(let dx = 0; dx < this.map.length; dx++) {
            for(let dy = 0; dy < this.map[dx].length; dy++) {
                if(this.map[dx][dy] !== null) {
                    this.tileSprites[this.map[dx][dy].tileId].draw(ctx, new Point(dx * TILE_SIZE, dy * TILE_SIZE), TILE_SIZE_PT);
                }
            }
        }

        for(const car of this.cars) {
            const fromAnchor = TileAnchorHelper.GetRealPosition(car.position, TILE_SIZE_PT);
            if(car.nextPosition !== undefined) {
                const toAnchor = TileAnchorHelper.GetRealPosition(car.nextPosition, TILE_SIZE_PT);
                const tileMidpoint = TileAnchorHelper.GetRealPosition({...car.position, anchor: ETileAnchor.Center}, TILE_SIZE_PT);

                const renderPosition = Point.Bezier([fromAnchor, tileMidpoint, toAnchor], interpPercent);

                const fromAngle = TileAnchorHelper.GetEntryRotation(car.position.anchor);
                const exitAngle = TileAnchorHelper.GetExitRotation(car.nextPosition.anchor);
                const rel = Angle.relativeAngle(fromAngle, exitAngle);

                car.sprite.draw(ctx, renderPosition, car.sprite.sourceSize, fromAngle + rel * interpPercent);
            }
        }
    }
}