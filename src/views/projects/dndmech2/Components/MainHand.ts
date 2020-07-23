import IMechComponent from './IMechComponent';
import ShieldGen from './Individual/ShieldGen';
import { armor } from '../../../../projects/dndmech/SymbolDefinitions';

export const mainHandComponents: IMechComponent[] = [
{
    name: '“Incinerator” Flamecannon',
    description: 'Make an attack roll (1d8) against every creature in a 30 foot cone in front of you. Deal 2 damage to each creature hit.',
}, {
    name: '“Repeater” Autocannon',
    description: 'Make up to four attack rolls (1d8). You may split these attacks between creatures or you may use more than one on the same creature. Deal 1 damage to each creature hit. If you attack the same target more than once, roll only one attack, but deal full damage on a hit (IE: If you attack the same target twice, make one attack roll, but do 2 damage if you land it). This weapon is affected twice as much by armor.'
}, {
    name: '“Impact” Railgun',
    description: 'Make an attack roll (1d10). On a hit, deal 2 damage and 1 break. Deal 1 damage to any creature within 10 feet in a line behind the creature you hit.',
}, {
    name: '“Omen” Coil gun',
    description: 'Chose a target. Roll three attack rolls (1d6 each) against the target. Deal 1 damage for each hit. If all three attacks hit, deal either an additional +2 damage or 1 break.'
}, {
    name: '“AGL-1” Grenade Launcher',
    description: 'Make an attack roll (1d6). On a hit, deal 3 damage. On a miss, deal 1.'
}];