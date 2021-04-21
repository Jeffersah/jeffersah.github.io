import Queue from "../../data/queue";
import EPatternType from "../EPatternType";
import Production from "../Production";
import ProductionState from "../ProductionState";

export default class StateKey {
    public states: Set<ProductionState>;

    constructor(root: ProductionState[], allProductions: Map<string, Production[]>){
        this.states = new Set<ProductionState>();
        let pendingQueue = new Queue<ProductionState>(root);
        let alreadyFollowed = new Set<string>();
        while(pendingQueue.length() > 0) {
            const next = pendingQueue.pop();
            if(this.states.has(next)) continue;
            this.states.add(next);

            if(!next.isFinished()) {
                var nextPattern = next.nextPattern();
                if(nextPattern.type === EPatternType.production && !alreadyFollowed.has(nextPattern.value)) {
                    alreadyFollowed.add(nextPattern.value);
                    for(const expand of allProductions.get(nextPattern.value)) {
                        pendingQueue.push(expand.firstState);
                    }
                }
            }
        }
    }

    equals(other: StateKey) {
        if(this.states.size !== other.states.size) return false;
        for(const key of this.states) {
            if(!other.states.has(key)) return false;
        }
        return true;
    }

    toString() {
        let output = '';
        for(const state of this.states) {
            output += state.toString() + '\r\n';
        }
        return output;
    }
}