
console.log('*********************');
console.log('links.ts');

class Control {
    a: string = "";
    b: boolean = false;
    cranberrySauce: string = "hey paul, gear fab lets get the band back together";
    
    blah(): any {
        console.log('first call');
    }

    eventTopics = {
        tabDown: 'tabKeyDown',
        tabUp: 'tabKeyUp'
    }
}


export {
    Control
}

export class controlOptions {
    a: string = "hey man";
    b: boolean = true;
    cranberrySauce: string = "*** This is from links.ts: export class controlOptions {} ***";
}





