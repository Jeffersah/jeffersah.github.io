import IEntity from "../bullets/IEntity";
import IRenderable from "../common/rendering/IRenderable";
import HexArray from "./HexArray";
import HexCell from "./HexCell";
import IMapGen from "./mapGen/IMapGen";

export default class GameState {
    public tiles: HexArray<HexCell>;
    public entities: HexArray<IEntity>;
    
    constructor(size: number, floorNum: number, generator: IMapGen) {
        this.entities = new HexArray<IEntity>(size, null);
        generator.generateMap(floorNum, this);
    }
}