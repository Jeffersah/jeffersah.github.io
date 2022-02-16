import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function GlslCubeMapWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import(
        /* webpackChunkName: "glsl_cubemap" */
        /* webpackMode: "lazy" */
        './GlslCubeMapComponent')} />
}