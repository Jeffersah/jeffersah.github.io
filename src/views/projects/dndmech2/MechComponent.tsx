import * as React from 'react';
import * as css from './css/dndmech2.css';
import MechHp from './MechHp';
import { IComponentHp } from './Chassis';
import IMechComponent, { IMechCustomComponentProps } from './Components/IMechComponent';
import Dropdown from 'react-dropdown';

export interface IMechComponentProps {
    name: string;
    align: 'left' | 'center' | 'right';
    componentHp: IComponentHp;
    componentOptions: IMechComponent[];
    setDamageStatus?: (status: 'good' | 'damaged' | 'crit' | 'destroyed') => void;
    damageStatus?: 'good' | 'damaged' | 'crit' | 'destroyed';
}

const alignments = { left: 'flex-start', right: 'flex-end', center: 'center' };
const flows = { left: 'row', right: 'row-reverse', center: 'column' };

export default function MechComponent(props: IMechComponentProps & IMechCustomComponentProps) {

    const [component, setComponent] = React.useState<IMechComponent>(undefined);
    const customSetComponent = (newComp: IMechComponent) => {
        if (component !== undefined && component.onDeselect !== undefined) {
            component.onDeselect(props);
        }
        if (newComp.onSelect !== undefined) {
            newComp.onSelect(props);
        }
        setComponent(newComp);
    };

    return <div className={css['mech-container']}>
        <div style={{ display: 'flex', flexFlow: flows[props.align], justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className={(css as any)['title-' + props.damageStatus]}>{props.name}</h3>
            <div>
                <MechHp hpSteps={props.componentHp} maxArmor={props.componentHp.armor} permArmor={props.componentHp.permArmor} onDamageStatusChange={props.setDamageStatus}></MechHp>
            </div>
        </div>
        {props.componentOptions.length > 0 ?
            <div className='flow-row'>
                <div>Component: </div>
                <Dropdown className='flex-grow' options={props.componentOptions.map(c => c.name)} placeholder='CHOOSE' value={component === undefined ? undefined : component.name} onChange={chng => customSetComponent(props.componentOptions.find(item => item.name === chng.value))} />
            </div>
            : <></>}
        {component !== undefined ?
            <div style={{ padding: '10px' }}>{component.description}</div> : <></>}
        {component !== undefined && component.getCustomComponent !== undefined ?
            <component.getCustomComponent addComponentBonus={props.addComponentBonus}></component.getCustomComponent> : <></>}
    </div>;
}