import ITreeItem from "./StackItems/ITreeItem";
import StateMachine from "./StateMachine/StateMachine";
import StateNode from "./StateMachine/StateNode";
import Token, { EndOfStringToken } from "./Token";

export default class ParserState {
    parsedStack: ITreeItem[];
    stateStack: number[];
    inputStack: ITreeItem[];

    constructor(tokens: Token[]) {
        this.parsedStack = [];
        this.stateStack = [0];
        this.inputStack = [new EndOfStringToken()];
        for(let i = tokens.length - 1; i >= 0; i--) {
            this.inputStack.push(tokens[i]);
        }
    }

    toString() {
        let output = 'Parsed: \r\n\t(0)';
        for(let i = 0; i < this.parsedStack.length; i++){
            output += ` ${this.parsedStack[i].toString()} (${this.stateStack[i+1]})`;
        }
        output += '\r\nInput: \r\n\t';
        // Max 10 items
        for(let i = 0; i < this.inputStack.length && i < 10; i++){
            const idx = this.inputStack.length - 1 - i;
            output += ` ${this.inputStack[idx].toString()}`;
        }
        if(this.inputStack.length > 10) output += ' ...';
        return output;
    }
}