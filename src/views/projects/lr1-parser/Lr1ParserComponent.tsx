import * as React from 'react';
import ParserState from '../../../projects/common/parsing/ParseState';
import ProductionSet from '../../../projects/common/parsing/ProductionSet';
import StateMachine, { ParseResult } from '../../../projects/common/parsing/StateMachine/StateMachine';
import Token from '../../../projects/common/parsing/Token';
import SimpleTokenizer from '../../../projects/common/parsing/tokenizers/SimpleTokenizer';
import TreeRenderComponent from './TreeRenderComponent';

export default function Lr1ParserComponent() {
    const [grammar, setGrammar] = React.useState(`# Enter a grammar definition here
# supports comments (Starting with '#')
# Productions are formatted name -> literal <token> {production} ...

# Example grammar for arithmetic:
# (All left-recursive because this is an LR(1) parser)

# ALL production sets MUST start with a SINGLE root production, which has the pattern root -> {someProduction} $$
root -> {arith} $$

arith -> {arith} + {multiplication}
arith -> {arith} - {multiplication}
arith -> {multiplication}

multiplication -> {multiplication} * {value}
multiplication -> {multiplication} / {value}
multiplication -> {value}

value -> <number>
value -> ( {arith} )
`);

    const [input, setInput] = React.useState('1 + 1');

    const [tokens, setTokens] = React.useState<Token[]>([]);
    const [stateMachine, setStateMachine] = React.useState<StateMachine>(undefined);

    const [result, setResult] = React.useState<ParseResult>();

    React.useEffect(() => {
        const newTokens = new SimpleTokenizer().tokenize(input);
        setTokens(newTokens);
    }, [input])
    
    React.useEffect(() => {
        try {
            const productionSet = ProductionSet.FromGrammarFile(grammar.split('\n'));
            const newStateMachine = new StateMachine(productionSet, 'root');
            setStateMachine(newStateMachine);
        } catch {
            setStateMachine(undefined);
        }
    }, [grammar]);


    React.useEffect(() => {
        if(stateMachine === undefined || !stateMachine.isValid || tokens.length === 0) {
            setResult(undefined);
            return;
        }

        try {
            var result = stateMachine.parse(tokens);
            setResult(result);
        }
        catch {
            setResult(undefined);
        }
    }, [tokens, stateMachine]);


    let resultPanelContent: JSX.Element;
    if(stateMachine !== undefined && !stateMachine.isValid) {
        resultPanelContent = <span style={{color:'red'}}>
            Grammar is invalid.
        </span>;

        if(!stateMachine.isValid && stateMachine.invalidStateKey !== undefined) {
            
        resultPanelContent = <span style={{color:'red'}}>
            Grammar is invalid. The following state is ambiguous:
            <ul>
                {stateMachine.invalidStateKey.toString().split('\r\n').map((str, i) => 
                    <li key={i}>{str}</li>)}
            </ul>
        </span>;
        }
    }
    else if(result === undefined){

    }
    else if(StateMachine.isSuccessfulResponse(result)) {
        resultPanelContent = <TreeRenderComponent tree={result} />;
    }
    else {
        let errorMessage;
        if(result.badToken.value === '$$') {
            errorMessage = 'Unexpected end-of-string';
        }
        else {
            errorMessage = `Bad token '${result.badToken.value}' at ${result.badToken.lineNumber}:${result.badToken.colNumber}`;
        }
        resultPanelContent = <span style={{color:'red'}}>
            Parser failed. {errorMessage}.
        </span>;
    }


    return <div className='width-1-1'>
        <div className='width-1-4' style={{verticalAlign: 'top', border: '2px solid black'}}>
            <h1>Grammar</h1>
            <textarea wrap='off' style={{resize: 'vertical'}} className='width-1-1' value={grammar} onChange={ev => setGrammar(ev.target.value)} />
        </div>
        <div className='width-1-4' style={{verticalAlign: 'top', border: '2px solid black'}}>
            <h1>Input</h1>
            <textarea wrap='off' style={{resize: 'vertical'}} className='width-1-1' value={input} onChange={ev => setInput(ev.target.value)} />
        </div>
        <div className='width-1-2' style={{verticalAlign: 'top', border: '2px solid black'}}>
            <h1>Output</h1>
            {resultPanelContent}
        </div>
    </div>;
}