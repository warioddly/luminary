

export type LuminaryBackgroundOptions = {
    opacity: number;
    blur: number;
    duration: number;
    animation: string;
}


export type LuminaryOptions = {
    container: string;
    video: string;
    padding: number;
    background?: LuminaryBackgroundOptions;
}


class Luminary {


    private canvas: HTMLCanvasElement | undefined;
    private readonly container: HTMLDivElement | null;
    private readonly video: HTMLVideoElement | null;


    private readonly options: LuminaryOptions = {
        container: '#app-video-container',
        video: '#app-video',
        padding: 30,
        background: {
            opacity: 0.7,
            blur: 170,
            duration: 1,
            animation: 'fadeIn'
        }
    }


    constructor(options?: LuminaryOptions) {

        this.options = {
            ...this.options,
            ...options,
        };

        this.container = document.querySelector<HTMLDivElement>(this.options.container);
        this.video = document.querySelector<HTMLVideoElement>(this.options.video);

        if (!this.container || !this.video) {
            throw new Error('Container or Video not found');
        }

        this.video!.addEventListener('loadedmetadata', this.init.bind(this));
        window.addEventListener('resize', this.setupBackground.bind(this));

    }


    private init() {
        this.createCanvas();
        this.setupBackground();
        this.render();
    }


    private getVideoStream() {

        let canvas = this.canvas;

        if (!canvas || !this.video) {

            return;
        }

        canvas.getContext('2d')?.drawImage(this.video, 0, 0, canvas.width, canvas.height);

        if (this.container) {
            const data = canvas.toDataURL('image/png');
            this.container.style.backgroundImage = `url(${data})`;
        }

    }


    private createCanvas() {

        const { width, height }= this.getVideoRectBounds();

        this.canvas = document.createElement('canvas');
        this.canvas.width = width + this.options.padding;
        this.canvas.height = height + this.options.padding;

    }


    private setupBackground() {

        const { width, height }= this.getVideoRectBounds();

        if (!this.container) {
            throw new Error('Container not found');
        }

        const { animation, duration, opacity, blur } = this.options.background!;
        const padding = this.options.padding;

        this.container.style.width = `${width + padding}px`;
        this.container.style.height = `${height + padding}px`;
        this.container.style.opacity = `${opacity || 0.6}`;
        this.container.style.position = 'absolute';
        this.container.style.zIndex = '-1';
        this.container.style.filter = `blur(${blur || 150}px)`;
        this.container.style.top = `-${padding / 2}px`;
        this.container.style.left = `-${padding / 2}px`;
        this.container.style.animation = `${animation} ${duration}s ease-in-out`;
        this.container.style.transition = 'background-image';

    }


    private render() {

        if (this.video && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.getVideoStream();
        }

        requestAnimationFrame(this.render.bind(this));

    }


    private getVideoRectBounds(): { width: number, height: number } {

        if (!this.video) {
            return { width: 0, height: 0 }
        }
        const rect = this.video.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        }
    }


}


export default Luminary;