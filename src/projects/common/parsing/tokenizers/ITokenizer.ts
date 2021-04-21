import Token from "../Token";

export default interface ITokenizer {
    tokenize(input: string): Token[];
}