import ImageLoader from "../common/assets/ImageLoader";
import Point from "../common/position/Point";
import Rect from "../common/position/Rectangle";
import Sprite from "../common/rendering/Sprite";
import { HexToPixel } from "./Hex";

const originDelta = new Point(8, 26);

const deltaX = 3;
const deltaY = -2;

const maxTilesPerRow = 5;

export default class HpRenderer {
    private emptyHpImage: Sprite;
    private redHpImage: Sprite;
    private yellowHpImage: Sprite;
    private blueHpImage: Sprite;
    constructor(image: ImageLoader) {
        this.emptyHpImage = new Sprite(image.image, new Rect(0, 0, 4, 5));
        this.redHpImage = new Sprite(image.image, new Rect(3, 0, 4, 5));
        this.yellowHpImage = new Sprite(image.image, new Rect(6, 0, 4, 5));
        this.blueHpImage = new Sprite(image.image, new Rect(9, 0, 4, 5));
    }

    public draw(ctx:CanvasRenderingContext2D, pos: Point, hp: number, maxHp: number) {
        const rows = Math.ceil(maxHp / maxTilesPerRow);
        let lastRowLength = maxHp % maxTilesPerRow;
        if(lastRowLength === 0) { lastRowLength = maxTilesPerRow; }

        const fullImage = hp <= maxHp / 4 ? this.redHpImage : hp <= maxHp / 2 ? this.yellowHpImage : this.blueHpImage;
        const emptyImage = this.emptyHpImage;

        let originPoint = Point.add(HexToPixel(pos), originDelta);

        for(let row = 0; row < rows - 1; row++) {
            const dy = (rows - row - 1) * deltaY;
            for(let col = 0; col < maxTilesPerRow; col++) {
                let image = hp <= 0 ? emptyImage : fullImage;
                hp--;
                image.draw(ctx, new Rect(originPoint.x + col * deltaX, originPoint.y + dy, 4, 5), 0);
            }
        }

        // last row
        const lastRowDx = (maxTilesPerRow - lastRowLength) * deltaX / 2;
        for(let col = 0; col < lastRowLength; col++){
            let image = hp <= 0 ? emptyImage : fullImage;
            hp--;
            image.draw(ctx, new Rect(originPoint.x + col * deltaX + lastRowDx, originPoint.y , 4, 5), 0);
        }
    }
}