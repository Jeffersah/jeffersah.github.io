export type IFormSpec<T> = T extends object ? {
    [key in keyof T]?: IFieldSpec<T[key]>; 
} : never;

export interface IFieldSpec<T> {
    label?: string;
    inputType?: string;

    /// Return null for success
    preParseValidate?: (value: string) => string | null;

    parse?: (value:string) => T | undefined;
    
    /// Return null for success
    postParseValidate?: (value: T) => string | null;
    toFormValue?: (value:T) => string | number;
}

export function defaultParse(value: string, type: string)
{
    switch(type) 
    {
        case "int":
            let result = parseInt(value);
            if(isNaN(result)) return undefined;
            return result;
        case "number":
        case "float":
            result = parseFloat(value);
            if(isNaN(result)) return undefined;
            return result;
        case "string": return result;
        default: return undefined;
    }
}

export function defaultInputType(value: any) {
    switch(typeof(value)) {
        case 'number': return 'number';
        default: return 'string';
    }
}