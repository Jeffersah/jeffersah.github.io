export default interface IGenerator {
    name: string;
    generateSeries(seed: number[], mod: number): number[];
}