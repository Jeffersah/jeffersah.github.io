import Point from "../../common/position/Point";
import Assets from "../Assets";
import Entity from "../Entity";
import { SimpleCell } from "./HexCell";

export default class DownStairs extends SimpleCell {
    public static TypeID = 2;
    constructor(assets: Assets) {
        super(DownStairs.TypeID, assets, new Point(5, 0), true, true);
    }

    OnEntityStep(entity: Entity): void {
    }
}
