import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function GlslGeomFracWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import(
        /* webpackChunkName: "glsl_geomfrac" */
        /* webpackMode: "lazy" */
        './GlslGeomFracComponent')} />
}