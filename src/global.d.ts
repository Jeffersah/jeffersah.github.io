declare module '*.png'
{
    export let url: string
    export default url;
}

declare module '*.svg'
{
    export let url: string
    export default url;
}

declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.json" {
    const value: any;
    export default value;
}
// declare module '*.css' {
//     const css: any;
//     export default css;
// }