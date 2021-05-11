export default interface IMapDataJson {
    [key: string]: IProvinceJson;
}

export interface IProvinceJson {
    abbr: string;
    type: "land" | "sea" | "impassable";
    owner?: "EN" | "IT" | "FR" | "GE" | "RU" | "TU";
    data: string;
    supply?: boolean;
    connect?: string[] 
}