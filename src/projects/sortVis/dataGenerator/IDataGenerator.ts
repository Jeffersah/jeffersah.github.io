export default interface IDataGenerator {
    name: string;
    generate(index: number, totalLength: number): number;
}