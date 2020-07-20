import * as React from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import * as css from './css/dndmech2.css';
import MechComponent from './MechComponent';
import { IChassis, allChassies } from './Chassis';
import Dropdown from 'react-dropdown';
import { headComponents } from './Components/Head';
import { backComponents } from './Components/Back';
import { shoulderComponents } from './Components/Shoulder';
import { IComponentBonus, defaultComponentBonus, addCompBonus } from './ComponentBonus';
import { offhandComponents } from './Components/Offhand';
import { mainHandComponents } from './Components/MainHand';
import MechDisplay from './MechDisplay';


export type ComponentType = 'head'|'body'|'rarm'|'larm'|'rhand'|'lhand'|'rleg'|'lleg';
export interface IDamageStatus {
    head: 'good' | 'damaged' | 'crit' | 'destroyed';
    body: 'good' | 'damaged' | 'crit' | 'destroyed';
    rarm: 'good' | 'damaged' | 'crit' | 'destroyed';
    larm: 'good' | 'damaged' | 'crit' | 'destroyed';
    rhand: 'good' | 'damaged' | 'crit' | 'destroyed';
    lhand: 'good' | 'damaged' | 'crit' | 'destroyed';
    rleg: 'good' | 'damaged' | 'crit' | 'destroyed';
    lleg: 'good' | 'damaged' | 'crit' | 'destroyed';
}

export default function DndMech2Component() {
    const { width, height } = useWindowSize();
    const [ chassis, setChassis ] = React.useState<IChassis>(undefined);
    const [ compbonus, setCompBonus ] = React.useState<IComponentBonus>(defaultComponentBonus);
    const [ damageStatus, setDamageStatus ] = React.useState<IDamageStatus>({ head: 'good', body: 'good', rarm: 'good', larm: 'good', rhand: 'good', lhand: 'good', rleg: 'good', lleg: 'good'});
    const genSingleDamageStatus = (component: ComponentType) => {
        return (status: 'good' | 'damaged' | 'crit' | 'destroyed') => {
            const obj = {...damageStatus};
            obj[component] = status;
            setDamageStatus(obj);
        };
    };


    const addComponentBonus: (delta: { component: ComponentType, hp?: number, armor?: number, permArmor?: number }) => void = delta => {
        const clone = {...compbonus};
        clone[delta.component].hp += (delta.hp || 0);
        clone[delta.component].armor += (delta.armor || 0);
        clone[delta.component].permArmor += (delta.permArmor || 0);
        setCompBonus(clone);
    };

    return <div className={'full_body ' + css.main}>
        <div className='border center-col' style={{ width: '100%' }}>
            <h1>STATUS: {getStatus(chassis)}</h1>
            <div className='flow-row'><div>Chassis:</div><Dropdown options={allChassies.map(c => c.name)} placeholder='CHOOSE' value={chassis === undefined ? undefined : chassis.name} onChange={chng => setChassis(allChassies.find(item => item.name === chng.value))} /></div>
        </div>
        {chassis === undefined ? <></> : <div className={css['flex-col'] + ' center-col ' + css.body} style={{ width: '100%', opacity: chassis === undefined ? 0 : 1 }}>
            <div style={{ width: '100%', justifyContent: 'space-around' }} className={'flow-row ' + css['detail-row']}>
                <div>Move Speed: {chassis.moveSpeed}</div>
                <div>Dodge: 1d{chassis.dodgeDice}</div>
                <div>Attack Bonus: {chassis.attackBonus}</div>
                <div>Melee: 1d{chassis.meleeDice}</div>
            </div>
            <div style={{ width: '80%', height: '100%', display: 'flex' }}>
                <div className={css['flex-col'] + ' ' + css['fixed-col']}>
                    <MechComponent name='HEAD' align='left' setDamageStatus={genSingleDamageStatus('head')} damageStatus={damageStatus.head} componentHp={addCompBonus(chassis.head, compbonus.head)} componentOptions={headComponents} addComponentBonus={addComponentBonus} />
                    <MechComponent name='R-ARM' align='left' setDamageStatus={genSingleDamageStatus('rarm')} damageStatus={damageStatus.rarm} componentHp={addCompBonus(chassis.arm, compbonus.rarm)} componentOptions={[]} addComponentBonus={addComponentBonus} />
                    <MechComponent name='R-HAND' align='left' setDamageStatus={genSingleDamageStatus('rhand')} damageStatus={damageStatus.rhand} componentHp={addCompBonus(chassis.hand, compbonus.rhand)} componentOptions={mainHandComponents} addComponentBonus={addComponentBonus} />
                    <MechComponent name='R-LEG' align='left' setDamageStatus={genSingleDamageStatus('rleg')} damageStatus={damageStatus.rleg} componentHp={addCompBonus(chassis.leg, compbonus.rleg)} componentOptions={[]} addComponentBonus={addComponentBonus} />
                </div>
                <div className={css['flex-col'] + ' ' + css['fixed-col']}>
                    <MechComponent name='BODY' align='center' setDamageStatus={genSingleDamageStatus('body')} damageStatus={damageStatus.body} componentHp={addCompBonus(chassis.body, compbonus.body)} componentOptions={backComponents} addComponentBonus={addComponentBonus} />
                    <MechDisplay coreMaxHp={chassis.core} damageStatus={damageStatus} />
                </div>
                <div className={css['flex-col'] + ' ' + css['fixed-col']}>
                    <MechComponent name='SHLDR' align='right' componentHp={chassis.shldr} componentOptions={shoulderComponents} addComponentBonus={addComponentBonus} />
                    <MechComponent name='L-ARM' align='right' setDamageStatus={genSingleDamageStatus('larm')} damageStatus={damageStatus.larm} componentHp={addCompBonus(chassis.arm, compbonus.larm)} componentOptions={[]} addComponentBonus={addComponentBonus} />
                    <MechComponent name='L-HAND' align='right' setDamageStatus={genSingleDamageStatus('lhand')} damageStatus={damageStatus.lhand}  componentHp={addCompBonus(chassis.hand, compbonus.lhand)} componentOptions={offhandComponents} addComponentBonus={addComponentBonus} />
                    <MechComponent name='L-LEG' align='right' setDamageStatus={genSingleDamageStatus('lleg')} damageStatus={damageStatus.lleg} componentHp={addCompBonus(chassis.leg, compbonus.lleg)} componentOptions={[]} addComponentBonus={addComponentBonus} />
                </div>
            </div>
        </div>}
    </div>;
}

function getStatus(chassis: IChassis) {
    if (chassis === undefined) return <span className={css['status-ready'] + ' ' + css.status}>READY</span>;
    return <span className={css['status-operational'] + ' ' + css.status}>OPERATIONAL</span>;
}