import IDataGenerator from './IDataGenerator';

export default class SinData implements IDataGenerator {
    name = 'Sinusoidal';
    generate(index: number, totalLength: number): number {
        const xp = index / totalLength;
        return (Math.sin(xp * 2 * Math.PI) / 2) + 0.5;
    }
}