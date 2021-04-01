// Based on https://fettblog.eu/typescript-better-object-keys/

export type Keys<T> = 
  T extends object ? (keyof T)[] :
  T extends number ? [] :
  string[];

export default function GetKeys<T>(o: T): Keys<T> {
    return Object.keys(o) as Keys<T>;
}