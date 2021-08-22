import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function SimpleCypherWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import('./SimpleCypherComponent')} />
}