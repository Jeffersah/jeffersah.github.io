import * as React from 'react';


export function RpgTextEngineComponent() {
    const [inputText, setInputText] = React.useState('');
    const submitFunc = React.useRef<(s: string) => void>();

    React.useEffect(() => {
        import(
            /* webpackChunkName: "rpg-text-engine" */
            /* webpackMode: "lazy" */
            '../../../projects/rpg-text-engine').then(({ default: Run, SetInputText }) => {
            Run();
            submitFunc.current = SetInputText;
        });
    }, []);

    function onTextSubmitClick(str: string) {
        submitFunc.current(str);
    }

    return <div className='flex row justify-center'>
        <canvas id='canvas'></canvas>
        <div className='flex col'>
            <textarea value={inputText} onChange={ev => setInputText(ev.target.value)}>
            </textarea>
            <button onClick={() => onTextSubmitClick(inputText)}>Submit</button>
        </div>
    </div>;
}