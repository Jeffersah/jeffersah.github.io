declare namespace Dndmech2CssNamespace {
  export interface IDndmech2Css {
    "blink-red": string;
    "blink-yellow": string;
    body: string;
    "detail-row": string;
    "fade-in": string;
    "fixed-col": string;
    "flex-col": string;
    "flex-fill": string;
    main: string;
    "mech-container": string;
    "operational-anim": string;
    "ready-anim": string;
    status: string;
    "status-operational": string;
    "status-ready": string;
    "title-crit": string;
    "title-damaged": string;
    "title-destroyed": string;
    "title-good": string;
  }
}

declare const Dndmech2CssModule: Dndmech2CssNamespace.IDndmech2Css & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Dndmech2CssNamespace.IDndmech2Css;
};

export = Dndmech2CssModule;
