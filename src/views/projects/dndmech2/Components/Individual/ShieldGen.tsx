import * as React from 'react';
import MechHp from '../../MechHp';
import { IMechCustomComponentProps } from '../IMechComponent';

export default function ShieldGen(props: IMechCustomComponentProps) {
    return <div className='flow-row' style={{ justifyContent: 'space-between' }}>
        <span>Shield HP:</span>
        <MechHp hpSteps={{ good: 6, damaged: 0, crit: 0}} maxArmor={0} permArmor={0}></MechHp>
    </div>;
}