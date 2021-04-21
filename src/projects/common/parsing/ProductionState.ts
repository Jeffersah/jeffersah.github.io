import Production from "./Production";
import StackItemPattern from "./StackItemPattern";

export default class ProductionState {

    public nextState: ProductionState | undefined;

    constructor(public production: Production, public index: number) {
        if(this.isFinished()) {
            this.nextState = undefined;
        }
        else {
            this.nextState = new ProductionState(production, index + 1);
        }
    }

    isFinished(): boolean {
        return this.production.patterns.length === this.index;
    }

    nextPattern(): StackItemPattern {
        return this.production.patterns[this.index];
    }

    equals(other: ProductionState): boolean {
        return this.production === other.production && this.index === other.index;
    }

    toString(): string {
        let output = '';
        output += this.production.name + ' -> ';
        for(let i = 0; i < this.production.patterns.length; i++) {
            if(i === this.index)
                output += ' @';
            output += ' ' + this.production.patterns[i];
        }
        if(this.index === this.production.patterns.length)
            output += ' @';
        return output;
    }
}