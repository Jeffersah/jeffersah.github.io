import { customGroupBy, groupBy } from "../../../../LinqLike";
import ParserState from "../ParseState";
import ProductionState from "../ProductionState";
import StackItemPattern from "../StackItemPattern";
import ITreeItem from "../StackItems/ITreeItem";
import TreeBranch from "../StackItems/TreeBranch";
import StateKey from "./StateKey";
import StateMachine from "./StateMachine";

export default class StateNode {
    continuations: Map<StackItemPattern, StateNode>;
    completedProduction?: ProductionState;

    constructor(public id: number, public key: StateKey, public owner: StateMachine) {
        this.continuations = new Map<StackItemPattern, StateNode>();
        this.completedProduction = undefined;
    }

    generateContinuations(): boolean {
        const values = [...this.key.states].filter(s => !s.isFinished());
        const finishedStates = [...this.key.states].filter(s => s.isFinished());

        if(finishedStates.length > 1) return false;
        else if(finishedStates.length === 1) {
            this.completedProduction = finishedStates[0];
        }

        const groups = customGroupBy(values, (value) => value.nextPattern(), (k1, k2) => k1.equals(k2));
        for(const [nextPattern, states] of groups) {
            const key = new StateKey(states.map(state => state.nextState), this.owner.productions.allProductions);
            let continuation = this.owner.getOrCreate(key);
            if(continuation === undefined) return false;
            this.continuations.set(nextPattern, continuation);
        }
        return true;
    }

    tryStep(parserState: ParserState): boolean {
        const nextInput = parserState.inputStack[parserState.inputStack.length - 1];
        const validContinuations = Array.from(this.continuations.entries()).filter(arr => nextInput.matches(arr[0]));
        if(validContinuations.length === 1) {
            parserState.parsedStack.push(parserState.inputStack.pop());
            parserState.stateStack.push(validContinuations[0][1].id);
            return true;
        }
        else if(validContinuations.length > 1) {
            validContinuations.sort(([p1], [p2]) => p1.priorityCompare(p2));
            console.log(validContinuations);
            parserState.parsedStack.push(parserState.inputStack.pop());
            parserState.stateStack.push(validContinuations[0][1].id);
            return true;
        }
        

        if(this.completedProduction !== undefined) {
            // Reduce
            const children: ITreeItem[] = new Array<ITreeItem>(this.completedProduction.production.patterns.length);
            for(let i = this.completedProduction.production.patterns.length - 1; i >= 0; i--)
            {
                children[i] = parserState.parsedStack.pop();
                parserState.stateStack.pop();
            }
            parserState.inputStack.push(new TreeBranch(this.completedProduction.production, children));
            return true;
        }
        // console.log('PARSE FAILED!')
        // console.log('State: ' + parserState.toString());
        return false;
    }
}