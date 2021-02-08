import FibonacciGenerator from "./FibonacciGenerator";
import FibonacciPlusOneGenerator from "./FibonacciPlusOneGenerator";
import IGenerator from "./IGenerator";
import SumOfThreeGenerator from "./SumOfThreeGenerator";
import TriangleGenerator from "./TriangleGenerator";

export const Generators: IGenerator[] = [
    new FibonacciGenerator(),
    new FibonacciPlusOneGenerator(),
    new TriangleGenerator(),
    new SumOfThreeGenerator(),
]