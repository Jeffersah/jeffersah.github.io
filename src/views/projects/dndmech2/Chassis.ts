export interface IChassis {
    name: string;
    moveSpeed: number;
    attackBonus: number;
    dodgeDice: number;
    meleeDice: number;

    body: IComponentHp;
    head: IComponentHp;
    shldr: IComponentHp;
    arm: IComponentHp;
    hand: IComponentHp;
    leg: IComponentHp;
    core: number;
}

export interface IComponentHp {
    good: number;
    damaged: number;
    crit: number;
    armor: number;
    permArmor: number;
}

export const allChassies = [{
    name: 'Valor',
    moveSpeed: 60,
    attackBonus: 0,
    dodgeDice: 6,
    meleeDice: 6,

    body: { good: 8, damaged: 4, crit: 4, armor: 1, permArmor: 0 },
    head: { good: 3, damaged: 2, crit: 1, armor: 1, permArmor: 0 },
    shldr: { good: 0, damaged: 0, crit: 0, armor: 0, permArmor: 0 },
    arm: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    hand: { good: 1, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    leg: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    core: 3
}, {
    name: 'Rage',
    moveSpeed: 60,
    attackBonus: 2,
    dodgeDice: 6,
    meleeDice: 8,

    body: { good: 6, damaged: 4, crit: 4, armor: 1, permArmor: 0 },
    head: { good: 2, damaged: 2, crit: 1, armor: 0, permArmor: 0 },
    shldr: { good: 0, damaged: 0, crit: 0, armor: 0, permArmor: 0 },
    arm: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    hand: { good: 1, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    leg: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    core: 3
}, {
    name: 'Strength',
    moveSpeed: 45,
    attackBonus: 0,
    dodgeDice: 4,
    meleeDice: 6,

    body: { good: 8, damaged: 6, crit: 4, armor: 2, permArmor: 0 },
    head: { good: 4, damaged: 2, crit: 2, armor: 1, permArmor: 0 },
    shldr: { good: 0, damaged: 0, crit: 0, armor: 0, permArmor: 0 },
    arm: { good: 3, damaged: 2, crit: 1, armor: 0, permArmor: 0 },
    hand: { good: 2, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    leg: { good: 3, damaged: 2, crit: 1, armor: 0, permArmor: 0 },
    core: 2
}, {
    name: 'Flow',
    moveSpeed: 90,
    attackBonus: 0,
    dodgeDice: 8,
    meleeDice: 10,

    body: { good: 6, damaged: 4, crit: 4, armor: 1, permArmor: 0 },
    head: { good: 2, damaged: 2, crit: 1, armor: 0, permArmor: 0 },
    shldr: { good: 0, damaged: 0, crit: 0, armor: 0, permArmor: 0 },
    arm: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    hand: { good: 1, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    leg: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    core: 3
}, {
    name: 'Mind',
    moveSpeed: 90,
    attackBonus: 0,
    dodgeDice: 6,
    meleeDice: 8,

    body: { good: 6, damaged: 3, crit: 3, armor: 1, permArmor: 0 },
    head: { good: 2, damaged: 2, crit: 1, armor: 0, permArmor: 0 },
    shldr: { good: 0, damaged: 0, crit: 0, armor: 0, permArmor: 0 },
    arm: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    hand: { good: 1, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    leg: { good: 3, damaged: 1, crit: 1, armor: 0, permArmor: 0 },
    core: 5
}
];