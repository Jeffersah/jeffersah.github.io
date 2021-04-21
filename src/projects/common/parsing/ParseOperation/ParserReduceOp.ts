import Production from "../Production";
import ParserOp from "./ParseOperation";

export default class ParserReduceOp extends ParserOp {
    constructor(public reduction: Production, public index: number) {
        super();   
    }
    apply(): void {
    }

    toString(): string {
        return 'r' + this.index;
    }
}