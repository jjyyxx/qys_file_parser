import {staffUnit} from './staffUnit.js'
import { qysParserContext } from "./qysParserContext.js";
import { dispatcher } from "./dispatcher.js";

export {qysFileParser}

class qysFileParser {
    private _rawContent: string;
    private length: number;
    private context : qysParserContext
    
    readonly legalSymbols : Set <String> = new Set(['b','#',',',"'",'%','|','.','-','_'])

    private dispatcher : dispatcher

    constructor(content) {
        this._rawContent = content
        this.length = this._rawContent.length
        this.context = new qysParserContext()
        this.dispatcher = new dispatcher(this.context)
    }

    private dispatch(char : string/* , context : qysParserContext */) {
        if (char.length !== 1) {
            throw "length incompatible";
        } else {
            let pitch = parseInt(char)
            if (pitch) {
                this.dispatcher.pitch(pitch)
            } else {
                if (this.legalSymbols.has(char)) {
                    this.dispatcher[char](/* this.context */)
                } else {
                    throw `illegal symbol ${char} is given`;
                }
            }
        }
    }

    get rawContent(): string {
        return this._rawContent;
    }

    set rawContent(content: string) {
    }

    parse(){
        for (let i=0;i < this.length;i++) {
            this.dispatch(this.getChar(i)/* , this.context */)
        }
        return this.context
    }

    getChar(index : number){
        return this._rawContent.charAt(index)
    }
}