import Axios from 'axios-observable';

export class FileResource<T> {
    public body: T;
    constructor(fileUrl: string, private onload: () => void) {
        Axios.get(fileUrl).subscribe(data => {
            this.body = data.data as T;
            this.onload();
        });
    }
}