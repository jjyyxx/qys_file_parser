import { qysParserContext } from "./qysParserContext.js";
import { Dispatcher } from "./Dispatcher.js";

export {qysFileParser}

class qysFileParser {
    private context : qysParserContext
    
    readonly legalSymbols : Set <String> = new Set(['b','#',',',"'",'%','|','.','-','_','^','[','(','<'])

    readonly regionalSymbol : Set <String> = new Set(['[','(','<'])

    private dispatcher : Dispatcher

    constructor(content) {
        this.context = new qysParserContext(content)
        this.dispatcher = new Dispatcher(this.context)
    }

    private dispatch(char : string/* , context : qysParserContext */) {
        if (char.length !== 1) {
            throw "length incompatible";
        } else {
            let pitch = parseInt(char)
            if (!isNaN(pitch)) {
                this.dispatcher.pitch(pitch)
            } else {
                if (this.legalSymbols.has(char)) {
                    this.dispatcher[char]()
                } else {
                    throw `illegal symbol ${char} is given`;
                }
            }
        }
    }

    parse(){
        while (!this.context.isEnded()){
            let nextChar = this.context.nextChar()
/*             if (this.regionalSymbol.has(nextChar)) {
                throw "regional symbol is not supported yet"
            } */
            this.dispatch(nextChar)
        }
        this.context.finalCommit()
        return this.context
    }
}