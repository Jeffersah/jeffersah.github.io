export default class Queue<T> {
    private data: T[];
    private dataStart: number;
    private dataLength: number;

    constructor(initial ?: T[]) {
        this.data = [];
        this.dataStart = 0;
        this.dataLength = 0;
        if (initial !== undefined) {
            this.data = [...initial];
            this.dataStart = 0;
            this.dataLength = initial.length;
        }
    }

    push(value: T) {
        if (this.dataLength === this.data.length) {
            // Need to grow here
            if (this.dataStart === 0) {
                // We can just push to the arr
                this.data.push(value);
                this.dataLength++;
            }
            else {
                // We reorder so we can push easier later
                this.data = [...this.data, value];
                this.dataStart = 0;
                this.dataLength ++;
            }
        }
        else {
            // No need to grow, push and advance
            this.data[this.normalizeIndex(this.dataLength)] = value;
            this.dataLength++;
        }
    }

    peek(): T {
        if (this.dataLength === 0) throw new Error('Queue empty');
        return this.data[this.dataStart];
    }

    pop(): T {
        if (this.dataLength === 0) throw new Error('Queue empty');
        const result = this.data[this.dataStart];
        this.dataStart = this.normalizeIndex(1);
        this.dataLength--;
        return result;
    }

    length(): number {
        return this.dataLength;
    }

    peekIndex(n: number) {
        if (n < 0 || n >= this.dataLength) throw new Error('Out of range');
        return this.data[this.normalizeIndex(n)];
    }

    private normalizeIndex(n: number) {
        return (n + this.dataStart) % this.data.length;
    }
}