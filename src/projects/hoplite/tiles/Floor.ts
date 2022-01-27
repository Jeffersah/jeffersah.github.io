import Point from "../../common/position/Point";
import Assets from "../Assets";
import Entity from "../Entity";
import { SimpleCell } from "./HexCell";

export default class Floor extends SimpleCell {
    public static TypeID = 0;

    constructor(assets: Assets, customSprite?: Point) {
        super(Floor.TypeID, assets, customSprite ?? new Point(0, 0), true, customSprite !== undefined);
    }

    OnEntityStep(entity: Entity): void {
    }
}
