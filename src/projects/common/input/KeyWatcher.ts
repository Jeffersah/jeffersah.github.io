import KeyState from './KeyState';

export interface IKeyChange {
    key: string;
    change: 'press'|'release';
}

export default class KeyWatcher {
    downKeys: string[];
    changes: IKeyChange[];

    constructor(public attachedElement: HTMLElement, private logKeyNames?: boolean) {
        if  (this.logKeyNames === undefined) {
            this.logKeyNames = false;
        }
        attachedElement.addEventListener('keydown', k => this.onKeyDown(k));
        attachedElement.addEventListener('keyup', k => this.onKeyUp(k));

        this.downKeys = [];
        this.changes = [];
    }

    private onKeyDown(key: KeyboardEvent) {
        if (this.logKeyNames) {
            // tslint:disable-next-line: no-console
            console.log(key.key);
        }
        const idx = this.downKeys.indexOf(key.key);
        if (idx === -1) {
            this.changes.push({ key: key.key, change: 'press' });
            this.downKeys.push(key.key);
        }
    }

    private onKeyUp(key: KeyboardEvent) {
        this.changes.push({ key: key.key, change: 'release' });
        const idx = this.downKeys.indexOf(key.key);
        this.downKeys.splice(idx, 1);
    }

    public Update(): KeyState {
        const storeKeys = this.downKeys;
        const storeChanges = this.changes;

        this.downKeys = storeKeys.slice();
        this.changes = [];

        return new KeyState(storeKeys, storeChanges);
    }
}