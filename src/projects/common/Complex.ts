export class Complex {
    constructor(public real: number, public imaginary: number) { }

    public AbsSq(): number {
        return this.real * this.real + this.imaginary * this.imaginary;
    }
    public Abs(): number {
        return Math.sqrt(this.AbsSq());
    }

    public AddWith(other: Complex) {
        this.real += other.real;
        this.imaginary += other.imaginary;
    }

    public MultiplyWith(other: Complex) {
        const tmpReal = this.real * other.real - this.imaginary * other.imaginary;
        this.imaginary = this.real * other.imaginary + other.real * this.imaginary;
        this.real = tmpReal;
    }

    public Pow(power: number) {
        const rs = this.AbsSq();
        const theta = Math.atan2(this.imaginary, this.real);
        this.real = Math.pow(rs, power / 2) * Math.cos(theta);
        this.imaginary = Math.pow(rs, power / 2) * Math.sin(theta);
    }
}