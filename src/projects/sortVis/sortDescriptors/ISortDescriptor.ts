import ISort from "../sorts/ISort";

export default interface ISortDescriptor {
    displayName: string;
    algorithm?: ISort;
    getDescription(): JSX.Element;
}