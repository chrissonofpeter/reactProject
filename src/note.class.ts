
interface options {
    width: number;
    height: number;
    depth?: number;
    title?: string;
    content?: string;
    posX: number;
    posY: number;
    posZ: number;
}

export class Note {
    w: number;
    h: number;
    d: number;
    px: number;
    py: number;
    pz: number;
    title: string;
    content: string;

    
    constructor(options) {
        this.w = options.width || 100;
        this.h = options.height || 100;
        this.d = options.depth || 1;
        this.px = options.posX || 0;
        this.py = options.posY || 0;
        this.pz = options.posz || 0;
        this.title = options.title;
        this.content = options.content;
    }

}


