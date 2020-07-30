import IDataGenerator from './IDataGenerator';

export default class RandomData implements IDataGenerator {
    name = 'Random';
    generate(index: number, totalLength: number): number {
        return Math.random();
    }
}