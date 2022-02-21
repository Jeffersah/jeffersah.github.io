import MouseWatcher, { IMouseClick, IMouseDrag, IMouseState } from './MouseWatcher';
import Point from '../position/Point';

export default class MouseManager {

    watcher: MouseWatcher;
    public updates: IMouseState[];

    constructor(element: HTMLElement) {
        this.watcher = new MouseWatcher(element);
        this.updates = [];
    }

    public update(): void {
        this.updates = this.watcher.update();
    }


    public position() : undefined | Point {
        return this.watcher.position;
    }

    public isButtonDown(button: number) {
        return this.watcher.clickEvents[button] !== undefined;
    }

    public isButtonUp(button: number) {
        return !this.isButtonDown(button);
    }

    /** Returns true iff the provided button was pressed this frame */
    public isButtonPressed(button: number) {
        return this.updates.some(update => update.button === button && update.eventType === 'down');
    }
    
    /** Returns true iff the provided button was released this frame */
    public isButtonReleased(button: number) {
        return this.updates.some(update => update.button === button && update.eventType === 'up');
    }
    
    /** Returns true iff the provided button was released this frame and was not dragged */
    public isButtonClicked(button: number) {
        return this.updates.some(update => update.button === button && update.eventType === 'click');
    }
    
    /** Returns true iff the provided button was released this frame and was dragged */
    public isButtonDragEnd(button: number) {
        return this.updates.some(update => update.button === button && update.eventType === 'drag_end');
    }

    public tryGetDrag(button: number) {
        const drags = this.updates.filter(update => update.button === button && (update.eventType === 'drag' || update.eventType === 'drag_end'));
        if(drags.length === 0) { return undefined; }
        return drags[0] as IMouseDrag;
    }

    public tryGetClick(button: number) {
        const clicks = this.updates.filter(update => update.button === button && update.eventType === 'click');
        if(clicks.length === 0) { return undefined; }
        return clicks[0] as IMouseClick;
    }
}