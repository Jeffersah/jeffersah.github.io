export default class ImageLoader {
    public image: HTMLImageElement;

    constructor(imageUrl: string, onLoad: () => void) {
        this.image = document.createElement('img');
        this.image.src = imageUrl;
        this.image.addEventListener('load', onLoad);
    }
}