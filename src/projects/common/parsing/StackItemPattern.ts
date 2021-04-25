import EPatternType from "./EPatternType";

export default class StackItemPattern {
    constructor(public value: string, public type: EPatternType) {

    }

    static Literal(value: string): StackItemPattern {
        return new StackItemPattern(value, EPatternType.literal);
    }
    static TokenType(value: string): StackItemPattern {
        return new StackItemPattern(value, EPatternType.tokenType);
    }
    static Production(value: string): StackItemPattern {
        return new StackItemPattern(value, EPatternType.production);
    }
    static EndOfInput(): StackItemPattern {
        return new StackItemPattern('$$', EPatternType.endOfInput);
    }

    equals(other: StackItemPattern) { 
        return this.value === other.value && this.type === other.type;
    }

    priorityCompare(other: StackItemPattern): number {
        return other.type - this.type;
    }

    toString(): string {
        switch(this.type) {
            case EPatternType.literal: return this.value;
            case EPatternType.endOfInput: return '$$';
            case EPatternType.tokenType: return '<' + this.value + '>';
            case EPatternType.production: return '{' + this.value + '}';
        }
    }
}