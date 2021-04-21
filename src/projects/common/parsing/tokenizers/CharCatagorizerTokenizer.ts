import { all, any, first } from "../../../../LinqLike";
import StatefulTokenizer, { ETokenizerStep, TokenizerStepResult } from "./StatefulTokenizer";

export default class CharCatagorizerTokenizer extends StatefulTokenizer<string[]> {
    private characterClasses: ICharacterClass[];
    constructor() {
        super();
        this.characterClasses = [];
    }

    addCharacterClass(chars: string, tokenType: string, single?: boolean, discard?: boolean) {
        this.characterClasses.push({ chars, tokenType, single, discard });
    }

    handleChar(c: string, currentToken: string, state: string[] | undefined): TokenizerStepResult<string[]> {
        const validClasses = this.characterClasses.filter(cl => cl.chars.indexOf(c) !== -1);
        if(validClasses.length === 0) return ETokenizerStep.sendAndDiscard;
        if(any(validClasses, cl => cl.discard ?? false)) return ETokenizerStep.sendAndDiscard;

        // Look for valid continuation classes
        const outputClasses = validClasses
            .filter(cl => (cl.single??false) === false)
            .filter(cl => state === undefined || state.indexOf(cl.tokenType) !== -1);

        if(outputClasses.length !== 0) {
            return {
                op: ETokenizerStep.push,
                state: outputClasses.map(cl => cl.tokenType)
            };
        }

        const singleClasses = validClasses.filter(cl => cl.single);
        if(singleClasses.length > 0) {
            return {
                op: ETokenizerStep.individualToken,
                state: singleClasses.map(cl => cl.tokenType)
            };
        }

        // Not a discard, continuation, or single. This is a new token.
        return {
            op: ETokenizerStep.newToken,
            state: validClasses.map(cl => cl.tokenType)
        };
    }
    
    getTokenType(token: string, state: string[]): string {
        return state[0];
    }

    validateToken(token: string, state: string[]): boolean {
        return token.length > 0 && state.length > 0;
    }
}

interface ICharacterClass {
    chars: string;
    tokenType: string;
    single?: boolean;
    discard?: boolean;
}