import { findMax, flatMap } from "../../LinqLike";
import Point from "../common/position/Point";
import IMapDataJson, { IProvinceJson } from "./assets/IMapDataJson";
import { FactionType, ProvinceType } from "./Enums";

export default class Map {
    provinces: { [key: string]: Province };

    constructor(mapJson: IMapDataJson) {
        this.provinces = {};

        for(let key of Object.keys(mapJson)) {
            let json = mapJson[key];
            this.provinces[key] = new Province(key, json);
        }

        for(let key of Object.keys(this.provinces)){
            let province = this.provinces[key];
            if(province.type === 'impassable') continue;
            for(let key2 of Object.keys(this.provinces)){
                let other = this.provinces[key2];
                if(other == province || other.type === 'impassable') continue;
                if((mapJson[province.name].connect?.indexOf(other.name)??-1) !== -1 || areNeighbors(province, other)) {
                    province.neighbors.push(other);
                    other.neighbors.push(province);
                    if(other.type === 'sea' && province.type === 'land') province.type = 'coast';
                    if(other.type === 'land' && province.type === 'sea') other.type = 'coast';
                }
            }
        }
    }
}

function areNeighbors(p1: Province, p2: Province): boolean {
    for(const pol1 of p1.polygons) {
        for(const pol2 of p2.polygons) {
            if(arePolysTouching(pol1, pol2)) return true;
        }
    }
    return false;
}

const ADJ_THRESH = 4;
function arePolysTouching(p1: Point[], pt2: Point[]): boolean {
    for(let i = 0; i < p1.length; i++) {
        let line = [p1[i], p1[(i+1)%p1.length]];
        for(let j = 0; j < pt2.length; j++) {
            let otherLine = [pt2[j], pt2[(j+1)%pt2.length]];
            if(Point.subtract(otherLine[0], line[0]).LengthSq() < ADJ_THRESH
                && Point.subtract(otherLine[1], line[1]).LengthSq() < ADJ_THRESH)
                return true;
                
            if(Point.subtract(otherLine[1], line[0]).LengthSq() < ADJ_THRESH
                && Point.subtract(otherLine[0], line[1]).LengthSq() < ADJ_THRESH)
                return true;
        }
    }
    return false;
}

export class Province {
    name: string;
    abbr: string;
    type: ProvinceType;
    supply: boolean;
    owner?: FactionType;
    polygons: Point[][];
    neighbors: Province[];
    midpoint: Point;

    constructor(key: string, json: IProvinceJson) {
        this.neighbors = [];
        this.polygons = [];
        this.owner = json.owner;
        this.supply = json.supply ?? false;
        this.type = json.type;
        this.name = key;
        this.abbr = json.abbr;

        let svgPath = json.data.split(' ');
        let svgMode: 'm' | 'v' | 'h' = 'm';
        let svgRelative: boolean = false;
        let polygon: Point[] = [];
        for(let component of svgPath) {
            switch(component) {
                case 'm':
                case 'l':
                case 'M':
                case 'L':
                    svgMode = 'm';
                    svgRelative = component.toUpperCase() != component;
                    break;
                case 'v':
                case 'V':
                    svgMode = 'v';
                    svgRelative = component.toUpperCase() != component;
                    break;
                case 'h':
                case 'H':
                    svgMode = 'h';
                    svgRelative = component.toUpperCase() != component;
                    break;
                case 'z':
                case 'Z':
                    this.polygons.push(polygon);
                    polygon = [];
                    break;
                default:
                    var lastPt = polygon.length === 0 
                        ? this.polygons.length === 0 ? new Point(0,0) : this.polygons[this.polygons.length - 1][this.polygons[this.polygons.length - 1].length - 1]
                        : polygon[polygon.length - 1];

                    var pt = component.split(',');

                    var parsed = svgMode === 'm' 
                        ? new Point(parseFloat(pt[0]), parseFloat(pt[1]))
                        : svgMode === 'h'
                        ? new Point(parseFloat(pt[0]), svgRelative ? 0 : lastPt.y)
                        : new Point(svgRelative ? 0 : lastPt.x, parseFloat(pt[0]));

                    if(isNaN(parsed.x) || isNaN(parsed.y))
                    {
                        console.log(key + ' parse FAILED: ' + component);
                    }

                    polygon.push(
                        svgRelative ? Point.add(lastPt, parsed) : parsed
                    );
                    break;
            }
        }
        if(polygon.length !== 0) this.polygons.push(polygon);
        
        let maxX = 0;
        let minX = 1024;
        let maxY = 0; 
        let minY = 1024;
        for(const poly of this.polygons) {
            for(const pt of poly) {
                if(pt.x < minX) minX = pt.x;
                if(pt.y < minY) minY = pt.y;
                if(pt.x > maxX) maxX = pt.x;
                if(pt.y > maxY) maxY = pt.y;
            }
        }
        this.midpoint = new Point((minX + maxX) / 2, (minY + maxY) / 2);
    }
}