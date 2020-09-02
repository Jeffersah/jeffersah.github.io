import * as React from 'react';
import BoardStackRendererComponent from './BoardStackRendererComponent';
import css from './css/componentCss.css';
import Board, { populateDefaultLayout } from './models/IBoard';
import { IState } from './models/State';
import Update from './update/Update';
import useInterval from '../../../hooks/useInterval';
import useAnimationFrame from '../../../hooks/useAnimationFrame';
import Chess3dDisplay from './Chess3dDisplay';
import { withResizeDetector } from 'react-resize-detector';

export interface IGeneralProps {
    state: IState;
    apply: (upd: Update) => void;
}

const minAngularVelocity = 0.0001;
const spinAmt = 0.1;
const spinFriction = 0.98;

function Chess3dComponent(props: {width: number, height: number}) {
    const board = new Board(5);
    populateDefaultLayout(board);
    const [state, setState] = React.useState<IState>({ board, turn: 'black', selected: undefined });
    const [rotation, setRotation] = React.useState(0);
    const [angularVel, setAngularVel] = React.useState(0);

    function apply(update: Update) {
        setState(update(state));
    }

    useAnimationFrame(() => {
        if (angularVel !== 0) {
            setRotation(rotation + angularVel);
            setAngularVel(angularVel < minAngularVelocity && angularVel > -minAngularVelocity ? 0 : angularVel * spinFriction);
        }
    });

    let interiorWidth = 600;
    if (props.height !== undefined) {
        const singleBoardSize = props.height / state.board.size;
        interiorWidth = props.width - singleBoardSize * 2;
    }
    return <div className='fill' style={{ overflow: 'hidden' }}>
        <div className='flex row justify-center full-height'>
            <BoardStackRendererComponent rotation={rotation} innerRotate={false} state={state} apply={apply} />
            <div className='flex col' style={{ width: interiorWidth }}>
                <Chess3dDisplay state={state} apply={apply} angle={rotation}></Chess3dDisplay>
                <button onClick={() => setAngularVel(angularVel - spinAmt)}>&lt;</button>
                <button onClick={() => setAngularVel(angularVel + spinAmt)}>&gt;</button>
            </div>
            <BoardStackRendererComponent rotation={rotation} innerRotate={true} state={state} apply={apply} />
        </div>
    </div>;
}

export default withResizeDetector(Chess3dComponent);