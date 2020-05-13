import * as React from 'react';
import { useEffect } from 'react';
import Axios from 'axios-observable';


export function RenderFromUrlComponent({ url }: { url: string }) {
    const [content, setContent] = React.useState(null);

    React.useEffect(()=>{
        Axios.get(url).subscribe((content) => {
            setContent(content.data);
        });
    }, []);

    if(content === undefined) {
        return <div>Loading...</div>
    }
    return <div dangerouslySetInnerHTML={{ __html: content}}>
    </div>;
}