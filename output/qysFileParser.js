"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qysParserContext_js_1 = require("./qysParserContext.js");
const dispatcher_js_1 = require("./dispatcher.js");
class qysFileParser {
    constructor(content) {
        this.legalSymbols = new Set(['b', '#', ',', "'", '%', '|', '.', '-', '_']);
        this._rawContent = content;
        this.length = this._rawContent.length;
        this.context = new qysParserContext_js_1.qysParserContext();
        this.dispatcher = new dispatcher_js_1.dispatcher(this.context);
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
                if (this.legalSymbols.has(char)) {
                    this.dispatcher[char]();
                }
                else {
                    throw `illegal symbol ${char} is given`;
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
        return this.context;
    }
    getChar(index) {
        return this._rawContent.charAt(index);
    }
}
exports.qysFileParser = qysFileParser;
