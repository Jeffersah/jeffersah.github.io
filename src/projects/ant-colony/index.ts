import { findMax, findMin, max, min } from "../../LinqLike";
import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";
import { AntPath } from "./AntPath";
import { ColonyState } from "./ColonyState";
import { IRenderSettings } from "./IRenderSettings";
let currentPaintLoop = -1;


export default function Run(settings: IRenderSettings, cvs: HTMLCanvasElement) {
    stopPaintLoop();
    ResizeCanvas(cvs, 800, 600);
    const ctx = cvs.getContext('2d');

    let state = init(cvs, ctx, settings.numPts);
    paintLoop(cvs, ctx, settings, state);
}

export function Cleanup() {
    stopPaintLoop();
}

function stopPaintLoop() {
    totalMinPath = null;
    if(currentPaintLoop !== -1)
        clearTimeout(currentPaintLoop);
}

let totalMinPath: AntPath | null = null;
function paintLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, settings: IRenderSettings, state: ColonyState) {
    const minPath = tick(settings, state);
    if(totalMinPath === null || minPath.cost < totalMinPath.cost)
        totalMinPath = minPath;
    draw(canvas, ctx, state, minPath.path, totalMinPath.path);
    // TS thinks setTimeout returns a NodeJS.Timeout (?)
    currentPaintLoop = <number><any>setTimeout(() => paintLoop(canvas, ctx, settings, state), settings.delayPerFrame);
}

function tick(settings: IRenderSettings, state: ColonyState): AntPath {
    let ants = [];
    for(let i = 0; i < settings.numAnts; i++) {
        ants.push(AntPath.runPath(state, settings.signalPower, settings.distancePower, 0));
    }

    state.multWeights(settings.signalDecay);

    let maxSignalGain = 1 / settings.numAnts;
    let shortestPath = findMin(ants, ant => ant.cost);
    let longestPath = max(ants, ant => ant.cost);
    for(const ant of ants) {
        let antWeight: number;
        if(shortestPath.cost === longestPath)
            antWeight = 1;
        else 
            antWeight = 1 - ((ant.cost - shortestPath.cost) / (longestPath - shortestPath.cost));
        state.addWeights(ant.path, antWeight * maxSignalGain);
    }

    return shortestPath;
}

function init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, numPts: number): ColonyState {
    const points = [];
    for(let i = 0; i < numPts; i++) {
        points.push(new Point(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)));
    }
    drawPoints(canvas, ctx, points);
    let state = new ColonyState(points);
    return state;
}

function drawPoints(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, points: Point[]) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = '#aaa';
    ctx.beginPath();
    for(let i = 0; i < points.length; i++) {
        const point = points[i];
        ctx.moveTo(point.x, point.y);
        ctx.ellipse(point.x, point.y, 3, 3, 0, 0, Math.PI * 2);
    }
    ctx.fill();
}

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: ColonyState, currentBestPath?: number[], globalBestPath?: number[]) {
    drawPoints(canvas, ctx, state.points);
    ctx.strokeStyle = '#aaa';
    for(let i = 0; i < state.points.length; i++) {
        for(let j = 0; j < state.points.length; j++) {
            if(i === j) continue;
            ctx.beginPath();
            ctx.lineWidth = state.weight(i, j) * 5;
            ctx.moveTo(state.point(i).x, state.point(i).y);
            ctx.lineTo(state.point(j).x, state.point(j).y);
            ctx.stroke();
        }
    }
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    if(currentBestPath !== undefined) {
        ctx.beginPath();
        ctx.moveTo(state.point(currentBestPath[0]).x, state.point(currentBestPath[0]).y);
        for(let i = 1; i < currentBestPath.length; i++) {
            ctx.lineTo(state.point(currentBestPath[i]).x, state.point(currentBestPath[i]).y);
        }
        ctx.stroke();
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    if(globalBestPath !== undefined) {
        ctx.beginPath();
        ctx.moveTo(state.point(globalBestPath[0]).x, state.point(globalBestPath[0]).y);
        for(let i = 1; i < globalBestPath.length; i++) {
            ctx.lineTo(state.point(globalBestPath[i]).x, state.point(globalBestPath[i]).y);
        }
        ctx.stroke();
    }

}