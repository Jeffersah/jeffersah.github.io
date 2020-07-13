import INode from "./node";

export default class BranchNode implements INode {
    constructor(public children: INode[]) {

    }
}