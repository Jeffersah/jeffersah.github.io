import IDataGenerator from './IDataGenerator';

export default class NearSorted implements IDataGenerator {
    name = 'Near Sorted';
    generate(index: number, totalLength: number): number {
        let effectiveIndex = Math.floor(index + (Math.random() * (totalLength / 100) - (totalLength / 50)));
        if (effectiveIndex < 0) effectiveIndex = 0;
        if (effectiveIndex > totalLength) effectiveIndex = totalLength;
        return effectiveIndex / totalLength;
    }
}