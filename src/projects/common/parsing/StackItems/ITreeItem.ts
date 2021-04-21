import StackItemPattern from "../StackItemPattern";
import Token from "../Token";

export default interface IStackItem {
    matches(pattern: StackItemPattern): boolean;
    firstToken(): Token;
}