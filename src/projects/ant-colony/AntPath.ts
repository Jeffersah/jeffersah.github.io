import { ColonyState } from "./ColonyState";

export class AntPath {
    constructor(public path: number[], public cost: number) {

    }

    static runPath(state: ColonyState, signalPower: number, distPower: number, start: number) {
        const hitmap = [];
        const path = [start];
        let pathCost = 0;
        let index = start;
        for(let i = 0; i < state.points.length; i++) {
            hitmap.push(i === start);
        }

        for(let i = 0; i < state.points.length - 1; i++) {
            let next = this.runStep(state, signalPower, distPower, hitmap, index);
            pathCost += state.distance(index, next);
            path.push(next);
            index = next;
            hitmap[next] = true;
        }

        return new AntPath(path, pathCost);
    }

    static runStep(state: ColonyState, signalPower: number, distPower: number, hitmap: boolean[], index: number) {
        let pathWeights = [];
        let weightSum = 0;
        for(let i = 0; i < state.points.length; i++) {
            if(index === i || hitmap[i]) pathWeights[i] = 0;
            else {
                let weight = Math.pow(1/state.distance(index, i), distPower) * Math.pow(state.weight(index, i), signalPower);
                pathWeights.push( weight );
                weightSum += weight;
            }
        }
        let randomChoice = Math.random() * weightSum;
        for(let i = 0; i < pathWeights.length; i++) {
            if(hitmap[i]) continue;
            randomChoice -= pathWeights[i];
            if(randomChoice <= 0) return i;
        }
        return -1;
    }
}