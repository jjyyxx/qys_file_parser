"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qysParserContext_1 = require("./qysParserContext");
const Dispatcher_1 = require("./Dispatcher");
class qysFileParser {
    constructor(content) {
        // TODO: improve pattern
        this.legalSymbols = new Set(['b', '#', ',', "'", '%', '|', '.', '-', '_', '^', '[', '(', '<', '/']);
        this.regionalSymbol = new Set(['[', '(', '<']);
        this.context = new qysParserContext_1.qysParserContext(content);
        this.dispatcher = new Dispatcher_1.Dispatcher(this.context);
    }
    dispatch(char /* , context : qysParserContext */) {
        if (char.length !== 1) {
            throw "length incompatible";
        }
        else {
            let pitch = parseInt(char);
            if (!isNaN(pitch)) {
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
    parse() {
        while (!this.context.isEnded()) {
            let nextChar = this.context.nextChar();
            /*             if (this.regionalSymbol.has(nextChar)) {
                            throw "regional symbol is not supported yet"
                        } */
            this.dispatch(nextChar);
        }
        this.context.finalCommit();
        return this.context;
    }
}
exports.qysFileParser = qysFileParser;
//# sourceMappingURL=qysFileParser.js.map