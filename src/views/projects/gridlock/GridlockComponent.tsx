import * as React from 'react';
import Runner from '../../../projects/gridlock/Runner';

export default function GridlockComponent() {
    const ref = React.useRef<HTMLCanvasElement>();
    React.useEffect(()=>{
        const runner = new Runner(ref.current);
        runner.start();
        return ()=>runner.stop();
    }, [ref.current]);
    return <canvas ref={ref} />;
}
