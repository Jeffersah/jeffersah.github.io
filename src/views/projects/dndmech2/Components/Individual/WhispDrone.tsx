import * as React from 'react';
import MechHp from '../../MechHp';
import { IMechCustomComponentProps } from '../IMechComponent';

export default function WhispDrone(props: IMechCustomComponentProps) {
    return <div className='flow-row' style={{ justifyContent: 'space-between' }}>
        <span>Whisp HP:</span>
        <MechHp hpSteps={{ good: 1, damaged: 1, crit: 0}} maxArmor={0} permArmor={0}></MechHp>
    </div>;
}