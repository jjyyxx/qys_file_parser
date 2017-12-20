import {staffUnit} from './staffUnit.js'

export {qysFileParser}

class qysFileParser {
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