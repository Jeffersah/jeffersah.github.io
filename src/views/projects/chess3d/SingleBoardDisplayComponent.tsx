import { range } from '../../../LinqLike';
import React, { useEffect, useState, useRef, Ref } from 'react';
import IBoard from './models/IBoard';
import { IState } from './models/State';
import { IGeneralProps } from './Chess3dComponent';
import css, { board } from './css/singleBoard.css';
import { withResizeDetector } from 'react-resize-detector';
import { Complex } from '../../../projects/common';
import Point3 from './position/Point3';
import CellClick from './update/CellClick';
import buildClass from '../../../ClassBuilder';

export interface ISingleBoardDisplayComponent extends IGeneralProps {
    transform: {slide: number} | {rotate: number};
    layer: number;
    cellIndex: (x: number, y: number) => (Point3);
    width: number;
    height: number;
}
function SingleBoardDisplayComponent(props: ISingleBoardDisplayComponent) {

    const innerBoardSize = Math.floor(props.width / Math.SQRT2);
    const singleSqSize = innerBoardSize / props.state.board.size;

    const innerBoardStyle: React.CSSProperties = {
        width: innerBoardSize + 'px',
        height: innerBoardSize + 'px',
        transformOrigin: '50% 50%'
    };

    let counterRotate = 0;

    if ((props.transform as any).rotate !== undefined) {
        const rot = (props.transform as any).rotate;
        innerBoardStyle.transform = 'rotate(' + rot + 'rad)';
        counterRotate = -rot;
    } else {
        const position = new Complex(0, (props.layer - props.state.board.size / 2) / (props.state.board.size));
        position.multiplyWith(Complex.expi((props.transform as any).slide));
        const offset = position.real * (props.width - innerBoardSize) / 2;
        innerBoardStyle.transform = `translate(${Math.floor(offset)}px, 0)`;
    }

    return <div className='flex col align-center justify-center' style={{ height: props.width + 'px' }}>
        <div className={css.board} style={innerBoardStyle}>
        {range(0, props.state.board.size).map(x =>
            <div key={x} className='flex row'>
            {range(0, props.state.board.size).map(y => {
                const tgtPos = props.cellIndex(x, y);
                const tgtPiece = props.state.board.getPiece(tgtPos);
                let tgtImage = <></>;
                if (tgtPiece !== undefined) {
                    const tgtRect = tgtPiece.type.getImgRect(tgtPiece.team);
                    const scaleFactor = Math.floor(100 * singleSqSize / tgtRect.w);
                    tgtImage = <img src={tgtPiece.type.imgUrl} style={{
                        objectFit: 'none',
                        objectPosition: (-tgtRect.x) + 'px ' + (-tgtRect.y) + 'px',
                        width: tgtRect.w + 'px',
                        height: tgtRect.h + 'px',
                        transformOrigin: '50% 50%',
                        transform: 'rotate(' + counterRotate + 'rad) scale(' + scaleFactor + '%,' + scaleFactor + '%)',
                        pointerEvents: 'none',
                    }}></img>;
                }
                return <div
                    key={x * props.state.board.size + y}
                    className={
                        buildClass()
                        .add(css.cell)
                        .addIf(css.even, ((x + y + props.layer) % 2 === 0))
                        .addIf(css.odd, ((x + y + props.layer) % 2 !== 0))
                        .addIf(css.selected, props.state.selected !== undefined && tgtPos.equals(props.state.selected))
                        .addIf(css.highlight, props.state.board.highlights[tgtPos.x][tgtPos.y][tgtPos.z])
                        .add('flex row align-center justify-center').classString}
                    style={{ width: singleSqSize + 'px', height: singleSqSize + 'px' }}
                    onClick={() => props.apply(CellClick(tgtPos))}>
                {tgtImage}
                </div>;
            })}
            </div>
        )}
        </div>
    </div>;
}

export default withResizeDetector(SingleBoardDisplayComponent);