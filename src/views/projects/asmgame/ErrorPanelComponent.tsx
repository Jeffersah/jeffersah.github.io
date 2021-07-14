import * as React from 'react';
import GameState from '../../../projects/asmgame/GameState';
import Instruction from '../../../projects/asmgame/language/Instruction';
import LangParser, { isParseFailure, isPostParseFailure, ParseFailure, PostParseFailure } from '../../../projects/asmgame/language/LangParser';
import { ILevelDefinition } from '../../../projects/asmgame/leveldef/ILevelDefinition';

export default function ErrorPanelComponent(props: { parseResult: Instruction[] | PostParseFailure | ParseFailure }) {
    let errorMsg = '';
    if(isParseFailure(props.parseResult)) {
        errorMsg = `Parse Failure: [${props.parseResult.badToken.lineNumber}:${props.parseResult.badToken.colNumber}]`;
    } else if(isPostParseFailure(props.parseResult)) {
        errorMsg = `Syntax Error: [${props.parseResult.badToken.lineNumber}:${props.parseResult.badToken.colNumber}] ${props.parseResult.errorMessage}`;
    } else {
        return <></>;
    }
    return <div style={{ position:'absolute', bottom: 0, width: '100%', border: '1px solid black', background: '#833' }}>
        {errorMsg}
    </div>;
}