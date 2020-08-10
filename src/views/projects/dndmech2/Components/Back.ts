import IMechComponent from './IMechComponent';
import ShieldGen from './Individual/ShieldGen';
import NaniteArmor from './Individual/NaniteArmor';

export const backComponents: IMechComponent[] = [
{
    name: 'Shield Generator',
    description: 'You have a large shield generator which reduces damage before it can hit you. +6 Temporary HP in every combat.',
    getCustomComponent: ShieldGen,
}, {
    name: 'Repair Kit',
    description: 'An automatic repair kit ensures damage affects your components less. Ignore any -1 roll penalty due to damage, or use your action to repair 1 armor or heal 2 health to any component on you or a friendly mech within 5 feet.'
}, {
    name: 'Electropack',
    description: 'Grant electric damage on melee attacks. Whenever you land a melee attack, deal +1 damage, ignoring armor. Any time one of your components is damaged below the -1 damage threshold by a melee attack, you emit a surge of energy that deals 1 damage ignore armor to every hostile creature within 5 feet of you.'
}, {
    name: 'Nanite Armor System',
    description: 'Grant +1 Permanent armor to any component, and grant +1 armor to two other components',
    getCustomComponent: NaniteArmor
}];