import * as React from 'react';

// Threw this together as a simple little component to test Github Copilot
// Turns out, it's pretty cool!

export default function SimpleCypherComponent() {
    const [input, setInput] = React.useState('');
    const [cypherKey, setCypherKey] = React.useState('');
    
    let output: string | undefined;
    let errorMessage;

    if(input === '') { errorMessage = 'Enter an input string' }
    else if(cypherKey === '') { errorMessage = 'Enter a cypher key' }
    else {
        output = '';
        errorMessage = undefined;

        const cypherCodes = cypherKey.split(' ').map(parseInt);

        for(let ch = 0; ch < input.length; ch++) {
            output += String.fromCharCode(input.charCodeAt(ch) ^ cypherCodes[ch % cypherKey.length]);
        }
    }

    return (
        <div>
            <h1>Simple Cypher</h1>
            <label>Input:</label>
            <input id='input' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
            <label>Cypher Key:</label>
            <input id='cypher-key' type='text' value={cypherKey} onChange={(e) => setCypherKey(e.target.value)}/>
            <label>Output:</label>
            {errorMessage !== undefined ? 
                <div style={{ color: 'red' }}>{errorMessage}</div> : 
                <textarea id='output' rows={10} cols={50} value={output} readOnly={true}/>}
        </div>
    );
}