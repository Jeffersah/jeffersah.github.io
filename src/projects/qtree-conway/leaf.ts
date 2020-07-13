import INode from "./node";

export default class LeafNode implements INode {
    constructor(public size: number, public data: boolean[]) {
    }
}