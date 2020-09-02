import { IState } from '../models/State';

type Update = (s: IState) => IState;

export default Update;