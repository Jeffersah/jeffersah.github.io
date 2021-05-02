import Point3 from "./Point3";

const identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

export default class Matrix4 {
    components: [
        [number, number, number, number],
        [number, number, number, number],
        [number, number, number, number],
        [number, number, number, number]
    ];

    constructor(identity: boolean = true) {
        if(identity) {
            this.components = [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];
        } else {
            this.components = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 1]
            ];
        }
    }

    public transform(p: Point3) : Point3 {
        let x = this.multRow(this.components[0], p);
        let y = this.multRow(this.components[1], p);
        let z = this.multRow(this.components[2], p);
        let w = this.multRow(this.components[3], p);
        return new Point3(x/w, y/w, z/w);
    }

    public mult(other: Matrix4): Matrix4 {
        const output = new Matrix4();
        for(let row = 0; row < 4; row++) {
            for(let col = 0; col < 4; col ++) {
                output.components[row][col] = 0;
                for(let i = 0; i < 4; i++) {
                    output.components[row][col] +=
                        this.components[row][i] *
                        other.components[i][col];
                }
            }
        }

        return output;
    }

    private multRow(row: [number, number, number, number], p: Point3) {
        return row[0] * p.x + row[1] * p.y + row[2] * p.z + row[3];
    }
    
    public colMajor(): number[] {
        let output = new Array(16);
        let i = 0;
        for(let row = 0; row < 4; row++) {
            for(let col = 0; col < 4; col++) {
                output[i++] = this.components[row][col];
            }
        }
        return output;
    }
    
    public rowMajor(): number[] {
        let output = new Array(16);
        let i = 0;
        for(let col = 0; col < 4; col++) {
            for(let row = 0; row < 4; row++) {
                output[i++] = this.components[row][col];
            }
        }
        return output;
    }

    public static translate(pt: Point3) {
        let output = new Matrix4();
        output.components[0][3] = pt.x;
        output.components[1][3] = pt.y;
        output.components[2][3] = pt.z;
        return output;
    }
}