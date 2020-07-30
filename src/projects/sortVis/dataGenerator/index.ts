import RandomData from './randomData';
import IDataGenerator from './IDataGenerator';
import ReverseSorted from './reverseSorted';
import NearSorted from './nearSorted';
import SinData from './sinData';

const allDataGenerators: IDataGenerator[] = [
    new RandomData(),
    new ReverseSorted(),
    new NearSorted(),
    new SinData()
];

export default allDataGenerators;