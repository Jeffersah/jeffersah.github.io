export function isComplex(a: number|Complex): a is Complex {
    return (a as Complex).real !== undefined;
}

export class Complex {
    constructor(public real: number, public imaginary: number) { }

    public absSq(): number {
        return this.real * this.real + this.imaginary * this.imaginary;
    }
    public abs(): number {
        return Math.sqrt(this.absSq());
    }

    public addWith(other: Complex): Complex {
        this.real += other.real;
        this.imaginary += other.imaginary;
        return this;
    }

    public multiplyWith(other: Complex): Complex {
        const tmpReal = this.real * other.real - this.imaginary * other.imaginary;
        this.imaginary = this.real * other.imaginary + other.real * this.imaginary;
        this.real = tmpReal;
        return this;
    }

    public scalarMultiplyWith(other: Complex): Complex;
    public scalarMultiplyWith(r: number, i: number): Complex;
    public scalarMultiplyWith(other: Complex | number, imaginary?: number): Complex {
        if (isComplex(other)) {
            this.real *= other.real;
            this.imaginary *= other.imaginary;
        }
        else {
            this.real *= other;
            this.imaginary *= imaginary;
        }
        return this;
    }

    public negate(): Complex {
        this.real = -this.real;
        this.imaginary = -this.imaginary;
        return this;
    }

    public pow(power: number): Complex {
        const rs = this.absSq();
        const theta = Math.atan2(this.imaginary, this.real);
        this.real = Math.pow(rs, power / 2) * Math.cos(theta);
        this.imaginary = Math.pow(rs, power / 2) * Math.sin(theta);
        return this;
    }

    public static add(a: Complex, b: Complex) {
        return new Complex(a.real + b.real, a.imaginary + b.imaginary);
    }

    public static mult(a: Complex, b: Complex) {
        return new Complex(a.real * b.real - a.imaginary * b.imaginary, a.real * b.imaginary + a.imaginary * b.real);
    }

    public static scalarMultiply(a: Complex, b: Complex): Complex;
    public static scalarMultiply(a: Complex, r: number, i: number): Complex;
    public static scalarMultiply(a: Complex, b: Complex | number, i ?: number): Complex {
        if (isComplex(b)) return new Complex(a.real * b.real, a.imaginary * b.imaginary);
        return new Complex(a.real * b, a.imaginary * i);
    }

    public static conjugate(a: Complex) {
        return new Complex(a.real, -a.imaginary);
    }

    public static negate(a: Complex) {
        return new Complex(-a.real, -a.imaginary);
    }

    public static inverse(a: Complex) {
        const conj = Complex.conjugate(a);
        const scale = 1 / a.absSq();
        return conj.scalarMultiplyWith(scale, scale);
    }

    public static expi(n: number): Complex {
        return new Complex(Math.cos(n), Math.sin(n));
    }

    public static exp(n: Complex): Complex {
        return this.expi(n.imaginary).multiplyWith(new Complex(Math.exp(n.real), 0));
    }
}