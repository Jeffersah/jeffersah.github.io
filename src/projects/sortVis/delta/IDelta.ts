import EComplexity from './EComplexity';
import SortState from '../SortState';

export default interface IDelta {
    apply(state: SortState): void;
    rollback(state: SortState): void;
    complexity: EComplexity;
    type: string;
}