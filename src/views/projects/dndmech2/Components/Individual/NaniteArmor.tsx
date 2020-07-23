import * as React from 'react';
import { IMechCustomComponentProps } from '../IMechComponent';
import Dropdown from 'react-dropdown';

const componentOptions: ('head'|'body'|'rarm'|'larm'|'rhand'|'lhand'|'rleg'|'lleg')[] = ['head', 'body', 'rarm', 'larm', 'rhand', 'lhand', 'rleg', 'lleg'];

export default function NaniteArmor(props: IMechCustomComponentProps) {
    const [permArmor, setPermArmor] = React.useState(undefined);
    const [bonus1, setBonus1] = React.useState(undefined);
    const [bonus2, setBonus2] = React.useState(undefined);

    return <div>
        <div className='flow-row' style={{ justifyContent: 'space-between' }}>
            <span>Permanent:</span>
            <Dropdown options={except(except(componentOptions, bonus2), bonus1)} value={permArmor} onChange={(changeTo) => {
                if (permArmor !== undefined) {
                    props.addComponentBonus({ component: permArmor, permArmor: -1 });
                }
                props.addComponentBonus({ component: changeTo.value as any, permArmor: 1 });
                setPermArmor(changeTo.value);
            }}></Dropdown>
        </div>
        <div className='flow-row' style={{ justifyContent: 'space-between' }}>
            <span>Bonus Armor:</span>
            <Dropdown options={except(except(componentOptions, permArmor), bonus2)} value={bonus1} onChange={(changeTo) => {
                if (bonus1 !== undefined) {
                    props.addComponentBonus({ component: bonus1, armor: -1 });
                }
                props.addComponentBonus({ component: changeTo.value as any, armor: 1 });
                setBonus1(changeTo.value);
            }}></Dropdown>
            <Dropdown options={except(except(componentOptions, permArmor), bonus1)} value={bonus2} onChange={(changeTo) => {
                if (bonus2 !== undefined) {
                    props.addComponentBonus({ component: bonus2, armor: -1 });
                }
                props.addComponentBonus({ component: changeTo.value as any, armor: 1 });
                setBonus2(changeTo.value);
            }}></Dropdown>
        </div>
    </div>;
}

function except<T>(arr: T[], item: T) {
    return arr.filter(test => test !== item);
}