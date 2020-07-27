import SortState from '../SortState';
import SortArray from '../SortArray';

export default interface ISort {
    name: string;
    sort(state: SortState, arr: SortArray): void;
}