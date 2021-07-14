import * as React from 'react';
import GameState from '../../../projects/asmgame/GameState';
import Instruction from '../../../projects/asmgame/language/Instruction';
import LangParser, { isParseFailure, ParseFailure, PostParseFailure } from '../../../projects/asmgame/language/LangParser';
import { ILevelDefinition } from '../../../projects/asmgame/leveldef/ILevelDefinition';
import ErrorPanelComponent from './ErrorPanelComponent';

export default function LevelDisplayComponent(props: { closeLevel: () => void, level: ILevelDefinition }) {
    const [value, setValue] = React.useState(`; ${props.level.name.toUpperCase()}`);
    const [parseResult, setParseResult] = React.useState<Instruction[] | PostParseFailure | ParseFailure>([]);

    const parser = new LangParser();

    React.useEffect(() => {
        const result = parser.TryParse(value, props.level, GameState.GetAllInstructions(props.level));
        console.log(result);
        setParseResult(result);
    }, [value]);

    return <div className='fill'>
        <div style={{ position: 'absolute', height: '100%', width: '50%', border: '1px solid black'}}>
            <div className='flex row'>
                <button onClick={() => props.closeLevel()}>Quit</button>
                <button style={{float: 'right'}}>Run</button>
                <button style={{float: 'right'}}>Step</button>
            </div>
            <div style={{position: 'absolute', left:0, bottom:0, right: 0, top: '20px' }}>
                <textarea style={{ height:'100%', width: '100%', resize: 'vertical' }} value={value} onChange={ch => setValue(ch.target.value)} />
            </div>
            <ErrorPanelComponent parseResult={parseResult} />
        </div>
        <div style={{ position: 'absolute',height: '100%', width: '50%', left: '50%', top: 0, border: '1px solid gray', overflowY: 'scroll'}}>
            
        </div>
    </div>;
}