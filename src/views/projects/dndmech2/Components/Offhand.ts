import IMechComponent from './IMechComponent';
import ShieldGen from './Individual/ShieldGen';
import { armor } from '../../../../projects/dndmech/SymbolDefinitions';

export const offhandComponents: IMechComponent[] = [
{
    name: '“Ablator” flare system',
    description: 'When you are targeted by a ranged attack, your attacker takes a -1 to the attack roll',
}, {
    name: 'Weapon Stabilizer',
    description: '+1 to all attack rolls'
}, {
    name: 'Heavy Shield',
    description: 'Grants +1 permanent armor and 2 HP to your offhand arm. If your arm is not broken, whenever you take an attack, you may roll 1d4. On a 3-4, the attack hits your offhand arm instead of its original target.',
    onSelect: props => props.addComponentBonus({ component: 'larm', permArmor: 1, hp: 2}),
    onDeselect: props => props.addComponentBonus({ component: 'larm', permArmor: -1, hp: -2}),
}, {
    name: 'Sword',
    description: 'It’s a sword. Your melee attacks now do 3 Damage.'
}, {
    name: 'Hammer',
    description: 'It’s a hammer. Your melee attacks now do 2 Damage and 1 Break.'
}];