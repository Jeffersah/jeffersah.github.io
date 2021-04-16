import { AtlasSprite } from "../common/assets/SpriteAtlas";
import ECarColor from "./ECarColor";
import ETileAnchor, { ITilePosition } from "./ETileAnchor";

export class Car {
    nextPosition?: ITilePosition;
    constructor(public color: ECarColor, public sprite: AtlasSprite, public position: ITilePosition, public isCrashed: boolean) {
        this.nextPosition = undefined;
    }
}