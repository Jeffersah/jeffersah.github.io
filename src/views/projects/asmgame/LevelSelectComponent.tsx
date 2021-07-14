import * as React from 'react';
import { ILevelDefinition } from '../../../projects/asmgame/leveldef/ILevelDefinition';
import allLevels from '../../../projects/asmgame/leveldef/levels';

export default function LevelSelect(props: { onSelect: (level: ILevelDefinition) => void }) {
    return <ol>
        {allLevels.map(level =>
            <li key={level.name}>
                <button onClick={() => props.onSelect(level)}>{level.name}</button>
            </li>
        )}
    </ol>
}