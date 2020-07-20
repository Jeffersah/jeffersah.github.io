import WhispDrone from './Individual/WhispDrone';

export const shoulderComponents = [
{
    name: 'Rocket Battery',
    description: 'Once per turn, when you make a ranged attack, chose another target creature and roll an attack (1d6). Deal 1 damage to the target on hit'
}, {
    name: '“Whisp” Recon Drone',
    description: 'You can launch the “Whisp” recon drone as a bonus action. The drone is invisible, can see invisible targets, and can move 120 feet per turn. The drone has 2 health and no armor. If it is damaged/destroyed, you can repair it out of combat.',
    getCustomComponent: WhispDrone,
}, {
    name: 'Fortification Shield System',
    description: 'You can use your action to enter “Fortified” mode. While fortified, you gain +2 permanent armor everywhere, but cannot move or attack. You may exit "Fortified" mode as a bonus action'
}];