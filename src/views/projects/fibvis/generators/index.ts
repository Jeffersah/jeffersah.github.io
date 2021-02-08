import FibonacciGenerator from "./FibonacciGenerator";
import FibonacciPlusOneGenerator from "./FibonacciPlusOneGenerator";
import IGenerator from "./IGenerator";

export const Generators: IGenerator[] = [
    new FibonacciGenerator(),
    new FibonacciPlusOneGenerator()
]