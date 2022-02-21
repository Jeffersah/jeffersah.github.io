import Point from '../position/Point';

export interface IMouseState {
    button: number;
    eventType: 'down' | 'up' | 'click' | 'drag' | 'drag_end';
}

export interface IMouseClick extends IMouseState{
    position: Point;
    eventType: 'down' | 'up' | 'click';
}

export interface IMouseDrag extends IMouseState{
    startPosition: Point;
    endPosition: Point;
    eventType: 'drag' | 'drag_end';
}

export default class MouseWatcher {

    public position: Point;
    public clickEvents: {[key: number]: {at: Point, isDrag: boolean}} = {};

    private outputEvents: IMouseState[] = [];

    constructor(public attachedElement: HTMLElement, private dragThreshold: number = 5) {

        attachedElement.addEventListener('mouseenter', ev => this.onMouseEnter(ev));
        attachedElement.addEventListener('mousemove', ev => this.onMouseMove(ev));
        attachedElement.addEventListener('mouseleave', ev => this.onMouseLeave(ev));
        
        attachedElement.addEventListener('mousedown', ev => this.onMouseDown(ev));
        attachedElement.addEventListener('mouseup', ev => this.onMouseUp(ev));
    }

    
    private onMouseEnter(ev: MouseEvent) {
        this.position = new Point(ev.offsetX, ev.offsetY);
    }
    
    private onMouseLeave(ev: MouseEvent) {
        this.position = undefined;
    }

    private onMouseMove(ev: MouseEvent) {
        this.position = new Point(ev.offsetX, ev.offsetY);
        for(const key in this.clickEvents) {
            const keyevent = this.clickEvents[key];
            if(keyevent.isDrag || Point.subtract(this.position, keyevent.at).lengthSq() >= this.dragThreshold * this.dragThreshold) {
                this.clickEvents[key].isDrag = true;
                
                this.outputEvents.push(<IMouseDrag>{ button: ev.button, startPosition: keyevent.at, endPosition: this.position, eventType: 'drag' });
            }
        }
    }
    
    private onMouseDown(ev: MouseEvent) {
        const position = new Point(ev.offsetX, ev.offsetY);
        this.clickEvents[ev.button] = { at: position, isDrag: false };
        this.outputEvents.push(<IMouseClick>{ button: ev.button, position, eventType: 'down' });
    }
    
    private onMouseUp(ev: MouseEvent) {
        this.position = new Point(ev.offsetX, ev.offsetY);
        const event = this.clickEvents[ev.button];
        if(event) {
            this.outputEvents.push(<IMouseClick>{ button: ev.button, position: event.at, eventType: 'up' });
            if(event.isDrag) {
                this.outputEvents.push(<IMouseDrag>{ button: ev.button, startPosition: event.at, endPosition: this.position, eventType: 'drag_end' });
            }
            else {
                this.outputEvents.push(<IMouseClick>{ button: ev.button, position: event.at, eventType: 'click' });
            }
        }
        delete this.clickEvents[ev.button];
    }

    public update() {
        const store = this.outputEvents;
        this.outputEvents = [];
        return store;
    }
}