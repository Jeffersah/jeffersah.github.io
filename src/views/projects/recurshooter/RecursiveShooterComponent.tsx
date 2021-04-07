import * as React from 'react';
import Runner from '../../../projects/recurshooter/Runner';

export default function RecursiveShooterComponent() {
    const ref = React.useRef<HTMLCanvasElement>();
    React.useEffect(()=>{
        const runner = new Runner(ref.current);
        runner.start();
        return ()=>runner.stop();
    }, [ref.current]);
    return <canvas ref={ref} />;
}
