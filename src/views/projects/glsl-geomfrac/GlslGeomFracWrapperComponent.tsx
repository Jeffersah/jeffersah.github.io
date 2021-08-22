import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function GlslGeomFracWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import('./GlslGeomFracComponent')} />
}