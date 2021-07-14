import Token from "../../common/parsing/Token";
import { Arg } from "./ArgImplementations";

export default class Instruction {
    constructor(
        public instruction: string,
        public silent: boolean,
        public reqFlags: string[],
        public args: Arg[],
        public firstToken: Token) {

    }
}