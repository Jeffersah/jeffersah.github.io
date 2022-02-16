import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function GlslCubesWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import(
        /* webpackChunkName: "glsl_cubes" */
        /* webpackMode: "lazy" */
        './GlslCubesComponent')} />
}