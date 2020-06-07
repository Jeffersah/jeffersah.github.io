export default class ImageLoader {
    public image: HTMLImageElement;
    constructor(imageUrl: string, onLoad: ()=>void)
    {
        this.image = document.createElement('img');
        this.image.src = "/dist/" + imageUrl;
        this.image.addEventListener('load', onLoad);
    }
}