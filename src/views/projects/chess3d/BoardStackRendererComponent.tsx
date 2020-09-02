import css from './css/sidebarCss.css';
import { range } from '../../../LinqLike';
import SingleBoardDisplayComponent from './SingleBoardDisplayComponent';
import React, { useState, useRef, useEffect } from 'react';
import IBoard from './models/IBoard';
import { IState } from './models/State';
import Update from './update/Update';
import { IGeneralProps } from './Chess3dComponent';
import { withResizeDetector } from 'react-resize-detector';
import Point3 from './position/Point3';

// tslint:disable-next-line: no-empty-interface
export interface IBoardStackRendererComponentProps extends IGeneralProps {
    width: number;
    height: number;
    rotation: number;
    innerRotate: boolean;
}

function BoardStackRendererComponent(props: IBoardStackRendererComponentProps) {
    const singleBoardSize = props.height / props.state.board.size;

    const layers = range(0, props.state.board.size);

    function tileMappingFunc(layer: number): (x: number, y: number) => Point3 {
        if (props.innerRotate) return (x: number, y: number) => new Point3(x, y, layer);
        return (x: number, y: number) => new Point3(layer, x, y);
    }

    return <div className='full-height flex col justify-space-between' style={{ width: singleBoardSize + 'px'}}>
        {layers.map(layer =>
            <SingleBoardDisplayComponent key={layer} {...props} layer={layer} transform={props.innerRotate ? { rotate: props.rotation } : { slide: props.rotation }} cellIndex={tileMappingFunc(layer)}></SingleBoardDisplayComponent>
        )}
    </div>;
}

export default withResizeDetector(BoardStackRendererComponent);