export class Color {
    private rgb?: { r: number, g: number, b: number };
    private hsv?: { h: number, s: number, v: number };

    constructor(vals: {r: number, g: number, b: number}|{h: number, s: number, v: number}) {
        if ((vals as any).h || (vals as any).s || (vals as any).v) {
            this.hsv = vals as any;
            this.rgb = undefined;
        }
        else  {
            this.rgb = vals as any;
            this.hsv = undefined;
        }
    }

    public static rgb(r: number, g: number, b: number): Color {
        return new Color({ r, g, b });
    }

    public static hsv(h: number, s: number, v: number): Color {
        return new Color({ h, s, v });
    }

    public r(): number;
    public r(v: number): void;
    public r(v?: number): number|void {
        this.reqRgb();
        if (v !== undefined) {
            this.rgb.r = v;
            this.hsv = undefined;
        } else {
            return this.rgb.r;
        }
    }

    public g(): number;
    public g(v: number): void;
    public g(v?: number): number|void {
        this.reqRgb();
        if (v !== undefined) {
            this.rgb.g = v;
            this.hsv = undefined;
        } else {
            return this.rgb.g;
        }
    }

    public b(): number;
    public b(v: number): void;
    public b(v?: number): number|void {
        this.reqRgb();
        if (v !== undefined) {
            this.rgb.b = v;
            this.hsv = undefined;
        } else {
            return this.rgb.b;
        }
    }

    public h(): number;
    public h(v: number): void;
    public h(v?: number): number|void {
        this.reqHsv();
        if (v !== undefined) {
            this.hsv.h = v;
            this.hsv = undefined;
        } else {
            return this.hsv.h;
        }
    }

    public s(): number;
    public s(v: number): void;
    public s(v?: number): number|void {
        this.reqHsv();
        if (v !== undefined) {
            this.hsv.s = v;
            this.hsv = undefined;
        } else {
            return this.hsv.s;
        }
    }

    public v(): number;
    public v(v: number): void;
    public v(v?: number): number|void {
        this.reqHsv();
        if (v !== undefined) {
            this.hsv.v = v;
            this.hsv = undefined;
        } else {
            return this.hsv.v;
        }
    }

    private componentToRgb(n: number) {
        const k = (n + this.hsv.h * 6) % 6;
        return this.hsv.v - this.hsv.v * this.hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
    }


    private reqRgb() {
        if (this.rgb === undefined) {
            this.calcRgb();
        }
    }
    private calcRgb() {
        this.rgb = {
            r: this.componentToRgb(5),
            g: this.componentToRgb(3),
            b: this.componentToRgb(1),
        };
    }

    private reqHsv() {
        if (this.hsv === undefined) {
            this.calcHsv();
        }
    }
    private calcHsv() {
        const {r, g, b} = this.rgb;
        const mx = Math.max(r, g, b);
        const mn = Math.min(r, g, b);
        let h = mx === mn ? 0
            : mx === r ? (g - b) / (mx - mn)
            : mx === g ? 2 + (b - r) / (mx - mn)
            : 4 + (r - g) / (mx - mn);
        h /= 6;
        while (h < 0) {
            h++;
        }
        this.hsv = {
            h,
            s: mx === mn ? 0 : (mx - mn) / mx,
            v: mx
        };
    }

    public toString(): string {
        this.reqRgb();
        return 'rgb(' + this.toByte(this.rgb.r) + ', ' + this.toByte(this.rgb.g) + ', ' + this.toByte(this.rgb.b) + ')';
    }

    private toByte(component: number) {
        return Math.floor(component * 255);
    }
}