import EPatternType from "../EPatternType";
import Production from "../Production";
import StackItemPattern from "../StackItemPattern";
import Token from "../Token";
import ITreeItem from "./ITreeItem";

export default class TreeBranch implements ITreeItem {
    constructor(public production: Production, public children: ITreeItem[])
    {
        
    }

    firstToken(): Token {
        return this.children[0].firstToken();
    }

    allTokens(): Token[] {
        let result = this.children[0].allTokens();
        for(let i = 1; i < this.children.length; i++) {
            result = [...result, ...this.children[i].allTokens()];
        }
        return result;
    }

    matches(pattern: StackItemPattern): boolean {
        return pattern.type === EPatternType.production && pattern.value === this.production.name;
    }

    toString() {
        return '{' + this.production.name + '}';
    }
}