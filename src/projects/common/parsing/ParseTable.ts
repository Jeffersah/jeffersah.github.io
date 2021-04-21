import StackItemPattern from "./StackItemPattern";
import StateMachine from "./StateMachine/StateMachine";

export default class ParseTable {
    constructor(stateMachine: StateMachine) {
        const allPatterns = new Set<StackItemPattern>();
        for(const [name, productions] of stateMachine.productions.allProductions) {
            for(const production of productions) {
                for(const pattern of production.patterns) {
                    if(!allPatterns.has(pattern)) allPatterns.add(pattern);
                }
            }
        }
    }
}