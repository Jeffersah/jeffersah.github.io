import IVisualizer from "./IVisualizer";

export default class VisualizerDef {
    constructor(public name: string, public generate: (mod: number, series: number[])=>IVisualizer)
    {

    }
}