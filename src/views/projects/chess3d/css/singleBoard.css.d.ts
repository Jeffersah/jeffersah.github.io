declare namespace SingleBoardCssNamespace {
  export interface ISingleBoardCss {
    board: string;
    cell: string;
    even: string;
    highlight: string;
    odd: string;
    selected: string;
  }
}

declare const SingleBoardCssModule: SingleBoardCssNamespace.ISingleBoardCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SingleBoardCssNamespace.ISingleBoardCss;
};

export = SingleBoardCssModule;
