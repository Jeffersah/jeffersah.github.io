import EPatternType from "./EPatternType";
import ProductionState from "./ProductionState";
import StackItemPattern from "./StackItemPattern";

export default class Production {
    public firstState: ProductionState;
    constructor(public name: string, public patterns: StackItemPattern[]) {
        this.firstState = new ProductionState(this, 0);
    }

    /// A production from a string
    // Format:
    // productionName -> pattern1 pattern2 pattern3 ...
    // Patterns may be wrapped in {} or <> to indicate production or token type (respectively)
    // Otherwise, they're treated as string literals.
    static FromString(str: string): Production {
        let productionSplitLocation = str.indexOf('->');
        let productionName = str.substr(0, productionSplitLocation).trim();
        let patterns = str.substr(productionSplitLocation + 2).split(' ').map(s => s.trim()).filter(s => s !== '');
        return new Production(productionName, patterns.map(this.PatternFromString));
    }

    private static PatternFromString(pattern: string): StackItemPattern {
        if(pattern.startsWith('{') && pattern.endsWith('}')) {
            return new StackItemPattern(pattern.substr(1, pattern.length - 2), EPatternType.production);
        } else if(pattern.startsWith('<') && pattern.endsWith('>')) {
            return new StackItemPattern(pattern.substr(1, pattern.length - 2), EPatternType.tokenType);
        } else if(pattern === '$$') {
            return new StackItemPattern('$$', EPatternType.endOfInput);
        } 
        else {
            return new StackItemPattern(pattern, EPatternType.literal);
        }
    }
}