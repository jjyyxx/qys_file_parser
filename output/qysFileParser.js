"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dispatcher_1 = require("./Dispatcher");
const qysParserContext_1 = require("./qysParserContext");
// tslint:disable-next-line:class-name
class qysFileParser {
    constructor(content) {
        // TODO: improve pattern
        this.legalSymbols = new Set([
            'b', '#', ',', '\'', '%', '|', '.', '-', '_', '^', '[', '(', '<', '/', ' ', '\n',
        ]);
        this.regionalSymbol = new Set(['[', '(', '<']);
        this.context = new qysParserContext_1.qysParserContext(content);
        this.dispatcher = new Dispatcher_1.Dispatcher(this.context);
    }
    parse() {
        while (!this.context.isEnded()) {
            const nextChar = this.context.nextChar();
            /*             if (this.regionalSymbol.has(nextChar)) {
                            throw "regional symbol is not supported yet"
                        } */
            this.dispatch(nextChar);
        }
        this.context.finalCommit();
        return this.context;
    }
    dispatch(char /* , context : qysParserContext */) {
        if (char.length !== 1) {
            throw new Error('length incompatible');
        }
        else if (char.isNumeric()) {
            const pitch = Number(char);
            this.dispatcher.pitch(pitch);
        }
        else if (this.legalSymbols.has(char)) {
            this.dispatcher[char]();
        }
        else {
            throw new Error(`illegal symbol ${char} is given`);
        }
    }
}
exports.qysFileParser = qysFileParser;
//# sourceMappingURL=qysFileParser.js.map