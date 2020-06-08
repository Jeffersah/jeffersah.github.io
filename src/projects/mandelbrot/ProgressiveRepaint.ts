export class ProgressiveRepaint {
    private x: number;
    private y: number;
    private scale: number;
    private maxScale: number;
    public finished: boolean;

    constructor(private canvasWidth: number, private canvasHeight: number) {
        this.finished = false;
        this.scale = this.maxScale = (1 << this.fastLog2(Math.min(canvasWidth, canvasHeight)));
        this.x = this.y = 0;
    }

    private fastLog2(v: number) {
        let shift = 0;
        while (v > 0) {
            shift++;
            v >>= 1;
        }
        return shift;
    }

    X(): number {
        return this.x * this.scale;
    }
    Y(): number {
        return this.y * this.scale;
    }
    Scale(): number {
        return this.scale;
    }

    // Returns bool done
    Advance(): boolean {
        this.x++;
        if (this.x * this.scale >= this.canvasWidth) {
            this.x = 0;
            this.y++;
            if (this.y * this.scale >= this.canvasHeight) {
                this.y = 0;
                if (this.scale === 1) {
                    this.finished = true;
                    return true;
                }
                else {
                    this.scale /= 2;
                }
            }
        }
        return false;
    }

    Reset() {
        this.finished = false;
        this.scale = this.maxScale;
        this.x = this.y = 0;
    }
}