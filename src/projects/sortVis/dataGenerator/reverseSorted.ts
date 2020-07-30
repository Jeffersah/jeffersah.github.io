import IDataGenerator from './IDataGenerator';

export default class ReverseSorted implements IDataGenerator {
    name = 'Reversed';
    generate(index: number, totalLength: number): number {
        return 1 - (index / totalLength);
    }
}