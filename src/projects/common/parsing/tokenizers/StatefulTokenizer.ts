import Token from "../Token";
import ITokenizer from "./ITokenizer";

export default abstract class StatefulTokenizer<TState> implements ITokenizer {
    constructor() {
    }

    tokenize(input: string): Token[] {
        let tokenSoFar = '';
        let state: TState|undefined = undefined;
        const output: Token[] = [];

        let line = 0;
        let col = 0;

        let tokenLine = 0;
        let tokenCol = 0;

        let trySendToken = () => {
            if(state !== undefined && this.validateToken(tokenSoFar, state))
            {
                output.push(new Token(tokenSoFar, this.getTokenType(tokenSoFar, state), tokenLine, tokenCol));
            }
            tokenSoFar = '';
            state = undefined;
            tokenLine = line;
            tokenCol = col;
        }

        for(const c of input) {
            const stepResult = this.handleChar(c, tokenSoFar, state);
            switch(stepResult) {
                case ETokenizerStep.push: tokenSoFar += c; break;
                case ETokenizerStep.sendAndDiscard: trySendToken(); break;
                default: 
                    switch(stepResult.op) {
                        case ETokenizerStep.push:
                            tokenSoFar += c;
                            state = stepResult.state;
                            break;
                        case ETokenizerStep.sendAndDiscard:
                            state = stepResult.state;
                            trySendToken();
                            break;
                        case ETokenizerStep.newToken:
                            trySendToken();
                            tokenSoFar = c;
                            state = stepResult.state;
                            break;
                        case ETokenizerStep.individualToken:
                            trySendToken();
                            tokenSoFar = c;
                            state = stepResult.state;
                            trySendToken();
                            break;
                    }
                break;
            }
            if(c === '\n') {
                line++;
                col = 0;
            } else {
                col++;
            }
        }
        
        trySendToken();

        return output;
    }

    abstract handleChar(c: string, currentToken: string, state: TState): TokenizerStepResult<TState>;
    abstract getTokenType(token: string, state: TState): string;
    validateToken(token: string, state: TState): boolean {
        return true;
    }
}

export type TokenizerStepResult<TState> = ETokenizerStep.push | ETokenizerStep.sendAndDiscard | { op: ETokenizerStep, state: TState }

export enum ETokenizerStep {
    /** pushes the current character to the token */
    push,
    /** Send the current token and discard this character */
    sendAndDiscard,
    /** Send the current token and start a new token with this character */
    newToken,
    /** Send the current token, and the current character as it's own token */
    individualToken,
}