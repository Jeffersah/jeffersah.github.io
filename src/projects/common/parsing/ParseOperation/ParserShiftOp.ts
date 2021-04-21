import ParserOp from "./ParseOperation";

export default class ParserShiftOp extends ParserOp {
    constructor(public state: number) {
        super();   
    }
    apply(): void {
    }

    toString(): string {
        return 's' + this.state;
    }
}