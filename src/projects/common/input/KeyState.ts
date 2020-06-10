import { IKeyChange } from './KeyWatcher';

export default class KeyState {
    constructor(public keys: string[], public changes: IKeyChange[]) {

    }

    public isKeyDown(key: string) {
        return this.keys.indexOf(key) !== -1;
    }

    public isKeyUp(key: string) {
        return this.keys.indexOf(key) === -1;
    }
}