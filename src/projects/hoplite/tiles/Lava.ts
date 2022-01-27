import Point from "../../common/position/Point";
import { StackRenderable } from "../../common/rendering/StackRenderable";
import Assets from "../Assets";
import Entity from "../Entity";
import GameState from "../GameState";
import HexCell from "./HexCell";
import MultiPartCell from "./MultiPartCell";

export default class Lava extends MultiPartCell {
    public static TypeID = 1;

    constructor(assets: Assets) {
        super(Lava.TypeID, assets, new Point(0, 4), false);
    }

    OnEntityStep(entity: Entity): void {
        if(!entity.isFlying)
            entity.hp -= 100;
    }
}