import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function GlslMandelbrotWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import('./GlslMandelbrotComponent')} />
}