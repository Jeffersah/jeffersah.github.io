import * as React from 'react';
import { ILevelDefinition } from '../../../projects/asmgame/leveldef/ILevelDefinition';
import LevelDisplayComponent from './LevelDisplayComponent';
import LevelSelect from './LevelSelectComponent';

export default function AsmGameComponent() {
    const [level, setLevel] = React.useState<ILevelDefinition>(undefined);

    if(level === undefined) return <LevelSelect onSelect={setLevel} />
    return <LevelDisplayComponent level={level} closeLevel={()=>setLevel(undefined)} />;
}