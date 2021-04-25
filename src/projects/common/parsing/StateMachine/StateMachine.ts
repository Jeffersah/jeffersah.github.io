import ParserState from "../ParseState";
import ProductionSet from "../ProductionSet";
import StackItemPattern from "../StackItemPattern";
import ITreeItem from "../StackItems/ITreeItem";
import Token from "../Token";
import StateKey from "./StateKey";
import StateNode from "./StateNode";

export default class StateMachine {
    states: StateNode[];
    isValid: boolean;
    invalidStateKey: StateKey;
    constructor(public productions: ProductionSet, firstProductionName: string) {
        this.states = [];
        this.isValid = true;
        this.states[0] = this.getOrCreate(
            new StateKey(
                productions.allProductions.get(firstProductionName).map(s => s.firstState), 
                productions.allProductions)
        );
    }

    getOrCreate(key: StateKey): StateNode {
        for(const state of this.states) {
            if(state.key.equals(key)) return state;
        }
        const newState = new StateNode(this.states.length, key, this);
        this.states.push(newState);
        if(!newState.generateContinuations())
        {
            if(this.isValid) this.invalidStateKey = key;
            this.isValid = false;
            this.states.pop();
            return undefined;
        }
        return newState;
    }

    createParseState(tokens: Token[]): ParserState {
        return new ParserState(tokens);
    }

    step(parserState: ParserState): ParserState | ParseResult {
        const node = this.states[parserState.stateStack[parserState.stateStack.length - 1]]; 
        if(node.tryStep(parserState)) {
            if(parserState.inputStack.length === 0)
                return parserState.parsedStack[0];
            return parserState;
        }
        else {
            return {
                badToken: parserState.inputStack[parserState.inputStack.length - 1].firstToken(),
                expected: Array.from(node.continuations.keys())
            };
        }
    }

    parse(tokens: Token[]): ParseResult {
        let state = this.createParseState(tokens);
        for(;;) {
            const result = this.step(state);
            if(this.isParserState(result)) state = result;
            else return result;
        }
    }


    private isParserState(input: ParserState | ParseResult): input is ParserState {
        return (input as ParserState).inputStack !== undefined;
    }

    static isSuccessfulResponse(input: ParseResult): input is ITreeItem {
        return (input as any).badToken === undefined;
    }
}

export type ParseResult = {
    badToken: Token,
    expected: StackItemPattern[]
} | ITreeItem;