import { dispatcher } from "./dispatcher.js";
export { qysFileParser };
class qysFileParser {
    constructor(content) {
        this.legalSymbols = ['b', '#', ',', "'"];
        this.dispatcher = new dispatcher(this.context);
        this._rawContent = content;
        this.length = this._rawContent.length;
    }
    dispatch(char /* , context : qysParserContext */) {
        if (char.length !== 1) {
            throw "length incompatible";
        }
        else {
            let pitch = parseInt(char);
            if (pitch) {
                this.dispatcher.pitch(pitch);
            }
            else {
                if (char in this.legalSymbols) {
                    this.dispatcher[char]();
                }
                else {
                    throw "legal symbol";
                }
            }
        }
    }
    get rawContent() {
        return this._rawContent;
    }
    set rawContent(content) {
    }
    parse() {
        for (let i = 0; i < this.length; i++) {
            this.dispatch(this.getChar(i) /* , this.context */);
        }
    }
    getChar(index) {
        return this._rawContent.charAt(index);
    }
}
