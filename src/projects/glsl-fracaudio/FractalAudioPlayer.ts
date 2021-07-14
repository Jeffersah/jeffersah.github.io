import { start } from "repl";
import { ResizeCanvas } from "../common/CanvasHelpers";
import { Complex } from "../common/Complex";
import { IAmplitudeFunction } from "./AmplitudeMode";
import { IFractal } from "./Fractals/IFractal";

const sampleRate = 8820; // 44100;
const upsampleRate = 44100;
const sampleTimeSeconds = 1;
const GAIN = 0.3;

export default class FractalAudioPlayer {
    private ctx: CanvasRenderingContext2D;
    private currentAudio: PlayingAudio;
    private audio: AudioContext;
    private gain: GainNode;

    constructor(private canvas: HTMLCanvasElement, private amplitude: IAmplitudeFunction)
    {
        ResizeCanvas(canvas, canvas.clientWidth, canvas.clientHeight);
        this.ctx = canvas.getContext('2d');
        this.ctx.strokeStyle = 'red';
        this.audio = new AudioContext();
        this.gain = this.audio.createGain();
        this.gain.gain.value = GAIN;
        this.gain.connect(this.audio.destination);
    }

    public Cleanup() {
        this.audio.close();
    }

    public Play(point: Complex, fractal: IFractal){
        this.currentAudio?.stop();
        this.currentAudio = new PlayingAudio(this.audio, point, fractal, this.amplitude);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.currentAudio.start(this.gain);

        this.ctx.beginPath();
        const range = Complex.add(this.currentAudio.maxBounds, Complex.negate(this.currentAudio.minBounds));
        for(let i = 0; i < this.currentAudio.arr.length; i++) {
            const xp = (this.currentAudio.arr[i].real - this.currentAudio.minBounds.real) / range.real;
            const yp = (this.currentAudio.arr[i].imaginary - this.currentAudio.minBounds.imaginary) / range.imaginary ;
            
            const tgtX = xp * this.canvas.width;
            const tgtY = yp * this.canvas.height;
            if(i === 0) this.ctx.moveTo(tgtX, tgtY);
            else this.ctx.lineTo(tgtX, tgtY);
        }
        this.ctx.stroke();
    }
}

class PlayingAudio {
    arr: Complex[];
    minBounds: Complex;
    maxBounds: Complex;
    source: AudioBufferSourceNode;
    constructor(private audio: AudioContext, point: Complex, fractal: IFractal, amplitude: IAmplitudeFunction) {
        this.arr = new Array(sampleRate * sampleTimeSeconds);

        const init = point;
        let z = fractal.Init(init);
        this.minBounds = new Complex(Infinity,Infinity);
        this.maxBounds = new Complex(-Infinity,-Infinity);
        for(let i = 0; i < this.arr.length; i++) {
            z = fractal.Iterate(z, init);
            this.arr[i] = new Complex(z.real, z.imaginary);
            this.minBounds.real = Math.min(this.minBounds.real, z.real);
            this.minBounds.imaginary = Math.min(this.minBounds.imaginary, z.imaginary);
            
            this.maxBounds.real = Math.max(this.maxBounds.real, z.real);
            this.maxBounds.imaginary = Math.max(this.maxBounds.imaginary, z.imaginary);
        }

        const result = amplitude.GetAmplitude(this.minBounds, this.maxBounds);
        this.minBounds = result.min;
        this.maxBounds = result.max;
    }

    start(tgt: GainNode) {
        const buffer = this.audio.createBuffer(2, upsampleRate * sampleTimeSeconds, upsampleRate);
        const source = this.audio.createBufferSource();

        const channelData = [buffer.getChannelData(0), buffer.getChannelData(1)];
        const range = Complex.add(this.maxBounds, Complex.negate(this.minBounds));
        for(let i = 0; i < channelData[0].length; i++) {

            const index = (i * sampleRate)/upsampleRate;
            const prev = Math.max(0, Math.floor(index));
            const next = Math.min(this.arr.length - 1, Math.ceil(index));
            const percent = index % 1;

            const interpReal = interp(this.arr[prev].real, this.arr[next].real, percent);
            const interpImaginary = interp(this.arr[prev].imaginary, this.arr[next].imaginary, percent);

            const xp = (interpReal - this.minBounds.real) / range.real;
            const yp = (interpImaginary - this.minBounds.imaginary) / range.imaginary;
 
            channelData[0][i] = xp * 2 - 1; 
            channelData[1][i] = yp * 2 - 1;
        }

        source.buffer = buffer;

        source.connect(tgt);
        source.start();

        this.source = source;
    }

    stop() {
        this.source?.stop();
    }
}


function interp(prev: number, next: number, perc: number)
{
    perc = (-Math.cos(perc) + 1) / 2;
    return prev * (1-perc) + next * perc;
}