import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function GlslFractalAudioWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import('./GlslFractalAudioComponent')} />
}