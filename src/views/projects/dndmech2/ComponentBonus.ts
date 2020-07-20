import { IComponentHp } from './Chassis';

export interface IComponentBonus {
    head: { hp: number, armor: number, permArmor: number };
    body: { hp: number, armor: number, permArmor: number };

    rarm: { hp: number, armor: number, permArmor: number };
    rhand: { hp: number, armor: number, permArmor: number };

    larm: { hp: number, armor: number, permArmor: number };
    lhand: { hp: number, armor: number, permArmor: number };

    rleg: { hp: number, armor: number, permArmor: number };
    lleg: { hp: number, armor: number, permArmor: number };
}

export const defaultSingleComponentBonus = { hp: 0, armor: 0, permArmor: 0 };
export const defaultComponentBonus: IComponentBonus = {
    head: {...defaultSingleComponentBonus},
    body: {...defaultSingleComponentBonus},

    rarm: {...defaultSingleComponentBonus},
    rhand: {...defaultSingleComponentBonus},

    larm: {...defaultSingleComponentBonus},
    lhand: {...defaultSingleComponentBonus},

    rleg: {...defaultSingleComponentBonus},
    lleg: {...defaultSingleComponentBonus}
};

export function addCompBonus(hp: IComponentHp, bonus: { hp: number, armor: number, permArmor: number }): IComponentHp {
    return {
        good: hp.good + bonus.hp,
        damaged: hp.damaged,
        crit: hp.crit,
        armor: hp.armor + bonus.armor,
        permArmor: hp.permArmor + bonus.permArmor,
    };
}