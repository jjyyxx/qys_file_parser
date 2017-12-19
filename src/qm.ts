import {staffUnit} from './staffUnit'

function play(file : File){
    let reader : FileReader = new FileReader()
    reader.onload = (event : Event & { target: { result: string }} ) => {
        let qyContent = event.target.result
        parseFile(qyContent)
    }
    reader.readAsText(file, 'UTF-8')
}

function parseFile(content : string){
    let parser = new qyParser(content)
    parser.parse()
}

class qyParser {
    private _rawContent: string;
    private length: number;
    result: Array<staffUnit>;
    
    get rawContent(): string {
        return this._rawContent;
    }

    set rawContent(content: string) {
    }

    constructor(content) {
        this._rawContent = content
        this.length = this._rawContent.length
    }

    parse(){
        for (let i=0;i < this.length;i++) {
            let staff = new staffUnit()
            staff.staff = this.getChar(i)
            this.result.push(staff)
        }
    }

    getChar(index : number){
        return this._rawContent.charAt(index)        
    }
}

