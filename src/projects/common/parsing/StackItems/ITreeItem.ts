import StackItemPattern from "../StackItemPattern";
import Token from "../Token";
import TreeBranch from "./TreeBranch";

export default interface ITreeItem {
    matches(pattern: StackItemPattern): boolean;
    firstToken(): Token;
    allTokens(): Token[];
}

export class TreeItem {
    static isToken(item: ITreeItem): item is Token {
        return (item as Token).value !== undefined || (item as Token).type !== undefined;
    }

    static isBranch(item: ITreeItem): item is TreeBranch {
        return (item as TreeBranch).children !== undefined;
    }

    static treeReduce<T>(item: ITreeItem, getTokenValue: (t: Token)=>T, mergeBranch: (b: TreeBranch, children: T[])=>T): T {
        if(this.isToken(item)) return getTokenValue(item);
        else if(this.isBranch(item)) {
            var childValues = item.children.map(child => this.treeReduce(child, getTokenValue, mergeBranch));
            return mergeBranch(item, childValues);
        } else throw 'Unknown tree item type?';
    }
}