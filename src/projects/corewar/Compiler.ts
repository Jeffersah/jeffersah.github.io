import ProductionSet from "../common/parsing/ProductionSet";
import StackItemPattern from "../common/parsing/StackItemPattern";
import StateMachine from "../common/parsing/StateMachine/StateMachine";
import Token from "../common/parsing/Token";
import SimpleTokenizer from "../common/parsing/tokenizers/SimpleTokenizer";
import Program from "./Program";

export default class CorewarsCompiler {
    private parser: StateMachine;
    private tokenizer: SimpleTokenizer;
    constructor() {
        this.parser = new StateMachine(ProductionSet.FromGrammarFile(COREWARS_GRAMMAR.split('\n')), 'root');
        this.tokenizer = new SimpleTokenizer();
    }

    parse(lines: string[]): Program | { badToken: Token, expected: StackItemPattern[] } {
        let trimmedLines = lines.map(CorewarsCompiler.trimComment)
            .map(l => l.trim())
            .filter(l => l !== '');
        const rejoinedOutput = trimmedLines.join('\n');
        const tokens = this.tokenizer.tokenize(rejoinedOutput);
        const parsed = this.parser.parse(tokens);
        if(!StateMachine.isSuccessfulResponse(parsed)) {
            return parsed;
        }
        console.log(parsed);
    }

    static trimComment(line: string){
        let semicolonIndex = line.indexOf(';');
        if(semicolonIndex === -1) return line;
        return line.substr(0, semicolonIndex + 1);
    }
}


const COREWARS_GRAMMAR = `root -> {stmt_list} $$

stmt_list -> {stmt_list} {stmt} ;
stmt_list -> {stmt} ;

stmt_list -> {stmt_list} {stmt}
stmt_list -> {stmt}

stmt -> <string> equ {arith}
stmt -> org <string>
stmt -> <string> : {cmd_name} {args}
stmt -> {cmd_name} {args}

stmt -> <string> : {cmd_name}
stmt -> <string> {cmd_name}
stmt -> {cmd_name}

cmd_name -> <string>
cmd_name -> <string> . <string>


args -> {arg} , {arg}
args -> {arg} {arg}
args -> {arg}

arg -> {arith}
arg -> <op> {arith}

arith -> {arith} + {multiplication}
arith -> {arith} - {multiplication}
arith -> {multiplication}

multiplication -> {multiplication} * {value}
multiplication -> {multiplication} / {value}
multiplication -> {value}

value -> <number>
value -> ( {arith} )
value -> <string>
value -> - {arith}`;

