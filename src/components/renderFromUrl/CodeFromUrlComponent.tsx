import * as React from 'react';
import Axios from 'axios-observable';

const keywords = /([^a-zA-Z0-9_])(public|private|protected|internal|static|void|operator|if|for|while|foreach|do|bool|byte|sbyte|int|uint|long|ulong|short|ushort|string|char|var|true|false|ref|out|class)(?![a-zA-Z0-9_])/g

export function CodeFromUrlComponent({ url }: { url: string }) {
    const [content, setContent] = React.useState<string[]>([]);

    React.useEffect(()=>{
        Axios.get(url).subscribe((content) => {
            let asString = content.data as string;
            asString = asString
                .replace(keywords, "$1<span class='k'>$2</span>")
                .replace(/([^a-zA-Z0-9_])((0[bx])?\d+)/g, "$1<span class='n'>$2</span>")
                .replace(/([^a-zA-Z0-9_])(return|break|continue|export|import)(?![a-zA-Z0-9_])/g, "$1<span class='r'>$2</span>")
                .replace(/%([a-zA-Z0-9])%/g, "<span class='$1'>")
                .replace(/%%/g, "</span>");
            const lines = asString.split(/\r?\n/)
                .map(l => l === '' ? ' ' : l);
            setContent(lines);
        });
    }, []);

    if(content.length === 0) {
        return <div>Loading...</div>
    }
    return <div className='code'>
        <div className='lineNums'>
            {content.map((e, i) =>
                <div key={i}>{i}</div>
            )}
        </div>
        <div className='content'>
            {content.map((e, i) =>
                <div key={i} dangerouslySetInnerHTML={{__html:e}} />
            )}
        </div>
    </div>;
}