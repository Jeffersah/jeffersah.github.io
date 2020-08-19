import * as React from 'react';
import * as css from './css/dndmech2.css';
import MechHp from './MechHp';
import { IComponentHp } from './Chassis';
import IMechComponent, { IMechCustomComponentProps } from './Components/IMechComponent';
import Dropdown from 'react-dropdown';
import { IDamageStatus } from './DndMech2Component';

// 'head'|'body'|'rarm'|'larm'|'rhand'|'lhand'|'rleg'|'lleg'
export interface IMechDisplayProps {
    coreMaxHp: number;
    damageStatus: IDamageStatus;
}

function colorFromStatus(status: 'good' | 'damaged' | 'crit' | 'destroyed') {
    switch (status) {
        case 'good': return 'gray';
        case 'damaged': return '#ff0';
        case 'crit': return '#f00';
        case 'destroyed': return 'black';
    }
}


function getAnimation(status: 'good' | 'damaged' | 'crit' | 'destroyed') {
    switch (status) {
        case 'good': return <></>;
        case 'damaged': return <animate attributeName='fill' values='gray;#ff0' dur='1s' repeatCount='indefinite'></animate>;
        case 'crit': return <animate attributeName='fill' values='gray;#f00' dur='500ms' repeatCount='indefinite'></animate>;
        case 'destroyed': return <></>;
    }
}

export default function MechDisplay(props: IMechDisplayProps) {
    const [coreState, setCoreState] = React.useState<'good' | 'damaged' | 'crit' | 'destroyed'>('good');

    return <div style={{ flexGrow: 1, marginTop: '10px' }} className='center-col'>
        <svg viewBox='0 0 10 12' height='200px'>
            {/* Head */}
            <path fill={colorFromStatus(props.damageStatus.head)} d='M 4,0 L 6,0 L 7,2 L 3,2 Z'>
                {getAnimation(props.damageStatus.head)}
            </path>

            {/* Body */}
            <path fill={colorFromStatus(props.damageStatus.body)} d='M 3,3 L 7,3 L 7,7 L 3,7 Z'>
                {getAnimation(props.damageStatus.body)}
            </path>

            {/* R Arm */}
            <path fill={colorFromStatus(props.damageStatus.rarm)} d='M 1,3 L 2,3 L 2,6 L 1,6 Z'>
                {getAnimation(props.damageStatus.rarm)}
            </path>

            {/* R Hand */}
            <path fill={colorFromStatus(props.damageStatus.rhand)} d='M 1,7 L2,7 L2,8 L1,8 Z'>
                {getAnimation(props.damageStatus.rhand)}
            </path>

            {/* L Arm */}
            <path fill={colorFromStatus(props.damageStatus.larm)} d='M 8,3 L 9,3 L 9,6 L 8,6 Z'>
                {getAnimation(props.damageStatus.larm)}
            </path>

            {/* L Hand */}
            <path fill={colorFromStatus(props.damageStatus.lhand)} d='M 8,7 L9,7 L9,8 L8,8 Z'>
                {getAnimation(props.damageStatus.lhand)}
            </path>

            {/* R Leg */}
            <path fill={colorFromStatus(props.damageStatus.rleg)} d='M 3,8 L4.3,8 L4.3,12 L3,12 Z'>
                {getAnimation(props.damageStatus.rleg)}
            </path>

            {/* L Leg */}
            <path fill={colorFromStatus(props.damageStatus.lleg)} d='M 5.7,8 L7,8 L7,12 L5.7,12 Z'>
                {getAnimation(props.damageStatus.lleg)}
            </path>
        </svg>
        <div style={{ marginBottom: '20px', marginTop: '10px' }} className='center-col'>
            <h3>CORE</h3>
            <MechHp maxArmor={0} permArmor={0} hpSteps={{ good: props.coreMaxHp, damaged: 0, crit: 0 }} onDamageStatusChange={state => setCoreState(state)}></MechHp>
        </div>
        {coreState === 'destroyed' ?
        <div className={css['eject-bar'] + ' flex col justify-space-between'}>
            <div className={css['eject-bar-frame']} />
            <div className={css['eject-bar-middle'] + ' flex col justify-center align-center'}>
                <span className={css['eject-text']}>EJECT</span>
                <span className={css['eject-text-sub']}>CORE IMPLOSION IMMINENT</span>
            </div>
            <div className={css['eject-bar-frame'] + ' ' + css['reverse']} />
        </div> : <></>}
    </div>;
}