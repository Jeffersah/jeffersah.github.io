import Instruction from './Instruction';

export default class Program {

    constructor(
        public name: string,
        public metadata: { [key: string]: string },
        public instructions: Instruction[],
        public startOffset: number) {
    }
}