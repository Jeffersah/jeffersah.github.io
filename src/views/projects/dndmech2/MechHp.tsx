import * as React from 'react';
import * as css from './css/dndmech2.css';
import { repeat } from '../../../LinqLike';
import useUpdateState from '../../../hooks/useUpdateState';

const HP_CELL_SIZE = 30;

export interface IMechHpProps {
    hpSteps: { good: number, damaged: number, crit: number };
    maxArmor: number;
    permArmor: number;
    onDamageStatusChange?: (type: 'good' | 'damaged' | 'crit' | 'destroyed') => void;
}

export default function MechHp(props: IMechHpProps) {
    const totalHp = props.hpSteps.good + props.hpSteps.damaged + props.hpSteps.crit;

    const [currentHp, setCurrentHp] = useUpdateState(totalHp, (hp: number) => {
        if (props.onDamageStatusChange !== undefined) {
            props.onDamageStatusChange(hp === 0 ? 'destroyed' : hp <= props.hpSteps.crit ? 'crit' : hp <= props.hpSteps.crit + props.hpSteps.damaged ? 'damaged' : 'good');
        }
    });

    const missingHp = totalHp - currentHp;

    const [currentArmor, setCurrentArmor] = React.useState(props.maxArmor);
    const missingArmor = props.maxArmor - currentArmor;
    if (missingArmor < 0) setCurrentArmor(props.maxArmor);

    const shouldUseTwoRows = totalHp >= 6;
    const allTypes = [...repeat<'good'>('good', props.hpSteps.good), ...repeat<'damaged'>('damaged', props.hpSteps.damaged), ...repeat<'crit'>('crit', props.hpSteps.crit)];
    const cells: { key: number, type: 'good' | 'damaged' | 'crit', active: boolean }[][] = [];

    const includeArmorRow = props.maxArmor > 0 || props.permArmor > 0;

    const hpWide = shouldUseTwoRows ? Math.ceil(totalHp / 2) : totalHp;
    const hpTall = (shouldUseTwoRows ? 2 : 1) + (includeArmorRow ? 1 : 0);

    if (shouldUseTwoRows) {
        const halfHp = Math.ceil(totalHp / 2);
        cells[0] = allTypes.slice(0, halfHp).map((type, i) => ({ key: i, type, active: i >= missingHp }));
        cells[1] = allTypes.slice(halfHp).map((type, i) => ({ key: i, type, active: (i + halfHp) >= missingHp }));
    }
    else {
        cells[0] = allTypes.map((type, i) => ({ key: i, type, active: i >= missingHp }));
    }

    const armorIndicators = [
        ...repeat<'break'>('break', missingArmor >= 0 ? missingArmor : 0),
        ...repeat<'armor'>('armor', currentArmor),
        ...repeat<'permanent'>('permanent', props.permArmor)
    ];

    const onArmorIndicatorClicked = (index: number) => {
        if (index < missingArmor) {
            setCurrentArmor(props.maxArmor - index);
        }
        else if (index < props.maxArmor) {
            setCurrentArmor(props.maxArmor - index - 1);
        }
    };

    const onHpIndicatorClicked = (index: number) => {
        if (index < missingHp) {
            setCurrentHp(totalHp - index);
        }
        else if (index < totalHp) {
            setCurrentHp(totalHp - index - 1);
        }
    };

    return <svg viewBox={'0 0 ' + hpWide + ' ' + hpTall} width={HP_CELL_SIZE * hpWide} height={HP_CELL_SIZE * hpTall}>
        {cells.map((row, y) =>
            <svg key={y} y={y}>
                {row.map((item, dx) =>
                    createSvgCell(item.key, item.type, item.active, dx + ((totalHp % 2 === 1) && (y === 1) ? 0.5 : 0), dx + y * hpWide, onHpIndicatorClicked)
                )}
            </svg>
        )}
        {includeArmorRow ?
            <svg y={hpTall - 1} x={hpWide - armorIndicators.length - ((totalHp % 2 === 1) && shouldUseTwoRows ? 0.5 : 0)}>
                {armorIndicators.map((indicatorType, i) =>
                    createArmorIndicator(i, i, indicatorType, onArmorIndicatorClicked))}
            </svg>
        : <></>}
    </svg>;
}

function createArmorIndicator(key: number, dx: number, type: 'break' | 'armor' | 'permanent', handleArmorClick: (i: number) => void) {
    const innerElement =
        type === 'break' ? <polyline vectorEffect='non-scaling-stroke' points='0.5,0 0.25,0.25 0.75,0.75 0.5,1' width='1' height='1' style={{ fill: 'none', stroke: 'black', strokeWidth: 2 }} /> : <></>;
    return <svg key={key} x={dx} width={1} height={1} onClick={() => handleArmorClick(key)}>
        <path vectorEffect='non-scaling-stroke' d='M 0.2,0 L0.8,0 L1,0.5 L0.8,1 L0.2,1 L0,0.5 Z' width='1' height='1' style={{ fill: type === 'break' ? '#a11' : type === 'armor' ? '#58d1cd' : 'purple', stroke: 'black', strokeWidth: 1 }}></path>
        {innerElement}
    </svg>;
}

function createSvgCell(key: number, type: 'good' | 'damaged' | 'crit', active: boolean, dx: number, index: number, handleHpClick: (i: number) => void) {
    const innerElement =
        type === 'good' ? <></>
        : type === 'damaged' ? makeStroke(true)
        : <>{makeStroke(false)}{makeStroke(true)}</>;

    return <svg key={key} x={dx} width={1} height={1} onClick={() => handleHpClick(index)}>
        <rect vectorEffect='non-scaling-stroke' width='1' height='1' style={{ fill: getColor(type, active), stroke: 'black', strokeWidth: 1 }}></rect>
        {innerElement}
    </svg>;
}

function getColor(type: 'good' | 'damaged' | 'crit', active: boolean) {
    switch (type) {
        case 'good': return active ? '#5dc' : '#333';
        case 'damaged': return active ? '#ff0' : '#552';
        case 'crit': return active ? '#f00' : '#622';
    }
}

function makeStroke(dir: boolean) {
    return <line x1={dir ? 0.8 : 0.2} y1={0.2} x2={dir ? 0.2 : 0.8} y2={0.8} style={{ stroke: 'black', strokeWidth: 0.1 }}></line>;
}