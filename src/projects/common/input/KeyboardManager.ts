import KeyWatcher, { IKeyChange } from './KeyWatcher';
import KeyState from './KeyState';

export default class KeyboardManager {

    watcher: KeyWatcher;
    prvState: KeyState;
    currentState: KeyState;

    constructor(element: HTMLElement, logKeyNames?: boolean) {
        this.watcher = new KeyWatcher(element, logKeyNames);
        this.prvState = this.currentState = this.watcher.Update();
    }

    public update(): void {
        this.prvState = this.currentState;
        this.currentState = this.watcher.Update();
    }

    public isKeyDown(key: string): boolean {
        return this.currentState.isKeyDown(key);
    }

    public isKeyUp(key: string): boolean {
        return this.currentState.isKeyUp(key);
    }

    public isKeyPressed(key: string): boolean {
        return this.currentState.isKeyDown(key) && this.prvState.isKeyUp(key);
    }

    public isKeyReleased(key: string): boolean {
        return this.currentState.isKeyUp(key) && this.prvState.isKeyDown(key);
    }

    public changes(): IKeyChange[] {
        return this.currentState.changes;
    }
}