import EPatternType from "./EPatternType";
import StackItemPattern from "./StackItemPattern";
import ITreeItem from "./StackItems/ITreeItem";

export default class Token implements ITreeItem{
    constructor(public value: string, public type: string, public lineNumber: number, public colNumber: number) {

    }
    firstToken(): Token {
        return this;
    }
    allTokens(): Token[] {
        return [this];
    }
    matches(pattern: StackItemPattern): boolean {
        switch(pattern.type) {
            case EPatternType.literal: return pattern.value === this.value;
            case EPatternType.tokenType: return pattern.value === this.type;
            default: return false;
        }
    }

    toString() {
        return this.value;
    }
}

export class EndOfStringToken implements ITreeItem {
    matches(pattern: StackItemPattern) {
        return pattern.type === EPatternType.endOfInput;
    }
    firstToken() {
        return new Token('$$', 'endOfString', -1, -1);
    }
    allTokens(): Token[] {
        return [this.firstToken()];
    }
    toString() {
        return '$$';
    }
}