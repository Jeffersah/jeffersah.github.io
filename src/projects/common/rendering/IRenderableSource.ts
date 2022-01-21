import Point from "../position/Point";
import IRenderable from "./IRenderable";

export default interface IRenderableSource {
    getPixelSize(): Point | undefined;
    getRenderable(): IRenderable;
}