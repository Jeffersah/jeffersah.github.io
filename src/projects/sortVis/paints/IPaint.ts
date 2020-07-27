import IDelta from "../delta/IDelta";
import SortState from "../SortState";

export default interface IPaint {
    name: string;
    repaint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: SortState, deltas: IDelta[]): void;
}