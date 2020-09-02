declare namespace SidebarCssCssNamespace {
  export interface ISidebarCssCss {
    fixedAspect: string;
  }
}

declare const SidebarCssCssModule: SidebarCssCssNamespace.ISidebarCssCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SidebarCssCssNamespace.ISidebarCssCss;
};

export = SidebarCssCssModule;
