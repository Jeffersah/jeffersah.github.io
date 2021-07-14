import ProductionSet from "../../common/parsing/ProductionSet";
import StackItemPattern from "../../common/parsing/StackItemPattern";
import { TreeItem } from "../../common/parsing/StackItems/ITreeItem";
import TreeBranch from "../../common/parsing/StackItems/TreeBranch";
import StateMachine from "../../common/parsing/StateMachine/StateMachine";
import Token from "../../common/parsing/Token";
import ITokenizer from "../../common/parsing/tokenizers/ITokenizer";
import SimpleTokenizer from "../../common/parsing/tokenizers/SimpleTokenizer";
import { ILevelDefinition } from "../leveldef/ILevelDefinition";
import { Arg, IndexedArg, NumericalArg, RegisterArg } from "./ArgImplementations";
import GRAMMAR from "./Grammar";
import { IInstructionImplementation } from "./IInstructionImplementation";
import Instruction from "./Instruction";

export default class LangParser {

    private parser: StateMachine;
    private tokenizer: ITokenizer;

    constructor() {
        const productions = ProductionSet.FromGrammarFile(GRAMMAR.split('\n'));
        this.parser = new StateMachine(productions, 'root');
        this.tokenizer = new SimpleTokenizer();
    }

    TryParse(input: string, level: ILevelDefinition, allImplementers: { [key:string]: IInstructionImplementation }) : Instruction[] | PostParseFailure | ParseFailure {
        let inputLines = input.split('\n');
        for(let i = inputLines.length - 1; i >= 0; i --) {
            inputLines[i] = inputLines[i].trim();
            const semiIndex = inputLines[i].indexOf(';');
            if(semiIndex === -1) continue;
            if(semiIndex === 0) {
                inputLines.splice(i, 1);
            }
            else {
                inputLines[i] = inputLines[i].substr(0, semiIndex + 1);
            }
        }

        input = inputLines.join('\n');

        const tokens = this.tokenizer.tokenize(input);
        if(tokens.length === 0) return [];

        const parseTree = this.parser.parse(tokens);
        if(!StateMachine.isSuccessfulResponse(parseTree)) {
            return parseTree;
        }
        if(!TreeItem.isBranch(parseTree)) throw 'This will never happen. I hope.';
        const tiResult = this.getTreeInstructions(parseTree);

        if(isPostParseFailure(tiResult)) return tiResult;
        const [instructionTrees, labels] = tiResult;

        const instrs: Instruction[] = [];
        for(let i = 0; i < instructionTrees.length; i++){
            const instResult = this.parseInstruction(instructionTrees[i], labels, level);
            if(isPostParseFailure(instResult)) return instResult;
            instrs.push(instResult);
        }

        for(let i = 0; i < instrs.length; i++) {
            const instruction = instrs[i];
            if(allImplementers[instruction.instruction] === undefined) {
                return { badToken: instruction.firstToken, errorMessage: 'Unrecognized instruction' };
            }
            const error = allImplementers[instruction.instruction].verify(instruction, level);
            if(error !== undefined) return { badToken: instruction.firstToken, errorMessage: error };
            for(const arg of instruction.args) {
                const argError = arg.verify(level);
                if(argError !== undefined) {
                    return { badToken: instruction.firstToken, errorMessage: 'Argument error: ' + argError };
                }
            }
        }

        return instrs;
    }

    private getTreeInstructions(result: TreeBranch): [TreeBranch[], { [key: string]: number }] | PostParseFailure {
        let instrs: TreeBranch[] = [];
        let labels: { [key: string]: number } = {};

        const lbl_instrs: TreeBranch[] = [];
        while(result.production.name === 'instrs') {
            lbl_instrs.splice(0, 0, result.children[result.children.length - 1] as TreeBranch);
            result = result.children[0] as TreeBranch;
        }
        lbl_instrs.splice(0,0,result);

        // lbl_instrs now contains an array of every lbl_instr
        for(const single of lbl_instrs) {
            if((single.children[0] as TreeBranch).production.name === 'lbl') {
                // This is a label
                const token = single.children[0].firstToken();
                if(labels[token.value] !== undefined) return { badToken: token, errorMessage: 'Duplicate label' };
                labels[token.value] = instrs.length;
            } else {
                // This is an instruction
                instrs.push(single.children[0] as TreeBranch);
            }
        }

        return [instrs, labels];
    }

    private parseInstruction(instr: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): Instruction | PostParseFailure {
        const inst = instr.firstToken().value;
        let flags: string = '';
        let args: Arg[] = [];

        for(const child of instr.children){
            if(!TreeItem.isBranch(child)) continue;
            if(child.production.name === 'flags') flags = child.firstToken().value;
            else if(child.production.name === 'arglist')
            { 
                const argResult = this.parseArgsRecurse(child, labels, level);
                if(isPostParseFailure(argResult)) return argResult;
                args = argResult;
            }
        }

        return new Instruction(inst.substr(0, 3), inst.length === 4 && inst[3] === 's', flags.split(''), args, instr.firstToken());
    }

    private parseArgsRecurse(tree: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): Arg[] | PostParseFailure {
        const arg = this.parseSingleArg(tree.children[tree.children.length - 1] as TreeBranch, labels, level);
        if(isPostParseFailure(arg)) return arg;

        if(tree.children.length === 1) return [arg];

        const argList = this.parseArgsRecurse(tree.children[0] as TreeBranch, labels, level);
        if(isPostParseFailure(argList)) return argList;
        argList.push(arg);

        return argList;
    }

    private parseSingleArg(tree: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): Arg | PostParseFailure {
        if(tree.children.length === 1) {
            // arg -> {arith}
            const result = this.parseArithOrRegister(tree.children[0] as TreeBranch, labels, level);
            if(isPostParseFailure(result)) return result;
            if(typeof(result) === 'string') return new RegisterArg(result);
            return new NumericalArg(result);
        }
        else if(tree.children.length === 2) {
            // arg -> @ {arith}
            const result = this.parseArithOrRegister(tree.children[1] as TreeBranch, labels, level);
            if(isPostParseFailure(result)) return result;
            if(typeof(result) === 'string') return new IndexedArg(result, undefined, undefined);
            return new IndexedArg(undefined, undefined, result);
        }
        else if(tree.children.length === 4) {
            // <string> [ {arith} ]
            var baseRegister = tree.children[0].firstToken().value;

            const index = this.parseArithOrRegister(tree.children[2] as TreeBranch, labels, level);
            if(isPostParseFailure(index)) return index;
            if(typeof(index) === 'string') return new IndexedArg(baseRegister, index, undefined);
            return new IndexedArg(baseRegister, undefined, index);
        }
        else {
            // <string> [ <string> , {arith} ]
            var baseRegister = tree.children[0].firstToken().value;
            var offsetRegister = tree.children[2].firstToken().value;

            const arithOffset = this.parseArith(tree.children[4] as TreeBranch, labels, level);
            if(isPostParseFailure(arithOffset)) return arithOffset;
            return new IndexedArg(baseRegister, offsetRegister, arithOffset);
        }
    }

    private parseArithOrRegister(arith: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): number | string | PostParseFailure {
        const allTokens = arith.allTokens();
        if(allTokens.length === 1) {
            const possiblyRegister = allTokens[0].value;
            if(level.registers.indexOf(possiblyRegister) !== -1
                || level.extRegisters.indexOf(possiblyRegister) !== -1) 
            {
                return possiblyRegister;
            }
        }

        return this.parseArith(arith, labels, level);
    }

    private parseArith(arith: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): number | PostParseFailure {
        if(arith.children.length === 1) return this.parseMult(arith.children[0] as TreeBranch, labels, level);
        const left = this.parseArith(arith.children[0] as TreeBranch, labels, level);
        const right = this.parseMult(arith.children[2] as TreeBranch, labels, level);

        if(isPostParseFailure(left)) return left;
        if(isPostParseFailure(right)) return right;

        return arith.children[1].firstToken().value === '+' ? left + right : left - right;
    }

    private parseMult(arith: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): number | PostParseFailure {
        if(arith.children.length === 1) return this.parseValue(arith.children[0] as TreeBranch, labels, level);
        const left = this.parseMult(arith.children[0] as TreeBranch, labels, level);
        const right = this.parseValue(arith.children[2] as TreeBranch, labels, level);

        if(isPostParseFailure(left)) return left;
        if(isPostParseFailure(right)) return right;

        return arith.children[1].firstToken().value === '*' ? left * right : left / right;
    }
    
    private parseValue(arith: TreeBranch, labels: { [key: string]: number }, level: ILevelDefinition): number | PostParseFailure {
        if(arith.children.length === 1) {
            const tok = arith.firstToken();
            if(tok.type === 'number') {
                return parseInt(tok.value);
            } else {
                const str = tok.value;
                if(labels[str] === undefined) return { badToken: tok, errorMessage: 'Unrecognized label ' + str };
                return labels[str];
            }
        }
        else if(arith.children.length === 2)  {
            // - {value}
            const valueParse = this.parseValue(arith.children[1] as TreeBranch, labels, level);
            if(isPostParseFailure(valueParse)) return valueParse;
            return -valueParse;
        } 
        else {
            // ( {arith} )
            return this.parseArith(arith.children[1] as TreeBranch, labels, level);
        }
    }
}

export type ParseFailure = { badToken: Token, expected: StackItemPattern[] };
export type PostParseFailure =  { badToken: Token, errorMessage: string };

export function isPostParseFailure<T>(item: T|PostParseFailure): item is PostParseFailure {
    return (item as PostParseFailure).badToken !== undefined && (item as PostParseFailure).errorMessage !== undefined;
}

export function isParseFailure<T>(item: T|ParseFailure): item is ParseFailure {
    return (item as ParseFailure).badToken !== undefined && (item as ParseFailure).expected !== undefined;
}