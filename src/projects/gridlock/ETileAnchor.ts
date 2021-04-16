import Point from "../common/position/Point";

enum ETileAnchor {
    Right = 0,
    Top = 1,
    Left = 2,
    Bottom = 3,
    Center = 4
}

export interface ITilePosition {
    anchor: ETileAnchor;
    position: Point;
}

export default ETileAnchor;

const HALF_PI = Math.PI / 2;
export class TileAnchorHelper {

    static AllAnchors: ETileAnchor[] = [ETileAnchor.Right, ETileAnchor.Bottom, ETileAnchor.Left, ETileAnchor.Top, ETileAnchor.Center];

    static AnchorToIndex(anchor: ETileAnchor): number {
        switch(anchor) {
            case ETileAnchor.Right: return 0;
            case ETileAnchor.Bottom: return 1;
            case ETileAnchor.Left: return 2;
            case ETileAnchor.Top: return 3;
            case ETileAnchor.Center: return 4;
            default: throw "Bad Anchor";
        }
    }

    static AnchorToTileMove(anchor: ETileAnchor): Point {
        switch(anchor) {
            case ETileAnchor.Right: return new Point(1, 0);
            case ETileAnchor.Bottom: return new Point(0, 1);
            case ETileAnchor.Left: return new Point(-1, 0);
            case ETileAnchor.Top: return new Point(0, -1);
            case ETileAnchor.Center: return new Point(0, 0);
            default: throw "Bad Anchor";
        }
    }

    static ReverseDirection(anchor: ETileAnchor) {
        if(anchor === ETileAnchor.Center) return ETileAnchor.Center;
        else return (anchor + 2) % 4;
    }

    static IndexToAnchor(index: number): ETileAnchor {
        switch(index) {
            case 0: return ETileAnchor.Right;
            case 1: return ETileAnchor.Bottom;
            case 2: return ETileAnchor.Left;
            case 3: return ETileAnchor.Top;
            case 4: return ETileAnchor.Center;
            default: throw "Bad Index";
        }
    }

    static GetAnchorOffset(anchor: ETileAnchor): Point {
        switch(anchor) {
            case ETileAnchor.Top: return new Point(0.5, 0);
            case ETileAnchor.Bottom: return new Point(0.5, 1);
            case ETileAnchor.Left: return new Point(0, 0.5);
            case ETileAnchor.Right: return new Point(1, 0.5);
            case ETileAnchor.Center: return new Point(0.5, 0.5);
            default: throw "Bad Anchor";
        }
    }


    static GetExitRotation(anchor: ETileAnchor): number {
        switch(anchor) {
            case ETileAnchor.Top: return HALF_PI * 3;
            case ETileAnchor.Bottom: return HALF_PI;
            case ETileAnchor.Left: return HALF_PI * 2;
            case ETileAnchor.Right: return 0;
            case ETileAnchor.Center: return 0;
            default: throw "Bad Anchor";
        }
    }

    static GetEntryRotation(anchor: ETileAnchor): number {
        return (TileAnchorHelper.GetExitRotation(anchor) + Math.PI) % (Math.PI * 2);
    }

    static GetRealPosition(position: ITilePosition, tileSize: Point) {
        var tilePosition = Point.Multiply(position.position, tileSize);
        var offsetPosition = Point.Multiply(TileAnchorHelper.GetAnchorOffset(position.anchor), tileSize);
        return tilePosition.AddWith(offsetPosition);
    }
}