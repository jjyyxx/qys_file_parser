"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appoggiatura_1 = require("./tokens/Appoggiatura");
const Chord_1 = require("./tokens/Chord");
const Comment_1 = require("./tokens/Comment");
const Measure_1 = require("./tokens/Measure");
const Repeat_1 = require("./tokens/Repeat");
const RepeatSkip_1 = require("./tokens/RepeatSkip");
const Setting_1 = require("./tokens/Setting");
const Staff_js_1 = require("./tokens/Staff.js");
const Suffix_1 = require("./tokens/Suffix");
const Terminal_1 = require("./tokens/Terminal");
const Tie_1 = require("./tokens/Tie");
const TokenType_1 = require("./tokens/TokenType");
const Tuplet_1 = require("./tokens/Tuplet");
const UnrecognizedToken_1 = require("./tokens/UnrecognizedToken");
class Tokenizer {
    constructor(content) {
        this.content = content;
        this.pointer = 0;
        this.length = this.content.length;
        this.result = [];
        this.lastStaff = undefined;
    }
    tokenize() {
        while (!this.isEnded()) {
            const nextChar = this.nextChar();
            const token = this.dispatch(nextChar);
            if (token) {
                if (token.type === TokenType_1.TokenType.Staff) {
                    this.lastStaff = token;
                    this.result.push(token);
                }
                else if (this.lastStaff && token.type === TokenType_1.TokenType.Suffix) {
                    this.lastStaff.appendSuffix(token);
                }
                else {
                    this.result.push(token);
                }
            }
        }
        return this.result;
    }
    dispatch(char) {
        // Staff
        if (char.isNumeric()) {
            const pitch = Number(char);
            if (pitch === 0) {
                return new Staff_js_1.Staff({ isRest: true });
            }
            else {
                return new Staff_js_1.Staff({ pitch });
            }
        }
        if (char === '%') {
            return new Staff_js_1.Staff({
                isDuplicate: true,
            });
        }
        // Suffix
        if (Tokenizer.Suffix.has(char)) {
            return new Suffix_1.Suffix(Tokenizer.SuffixDict[char]);
        }
        // Tie/Slur/Appoggiatura Right
        if (char === '^') {
            const next = this.nextChar(false);
            if (next !== ')') {
                return new Tie_1.Tie();
            }
            else {
                this.incPointer();
                return new Appoggiatura_1.Appoggiatura(TokenType_1.PairType.Right);
            }
        }
        // Chord
        if (char === '&') {
            return new Chord_1.Chord();
        }
        // Tuplet/Appoggiatura Ledt
        if (char === '(') {
            const tup = this.fetchUntil(')');
            if (tup) {
                if (tup.endsWith('^')) {
                    this.incPointer(-tup.length - 1); // reset
                    return new Appoggiatura_1.Appoggiatura(TokenType_1.PairType.Left);
                }
                else {
                    if (tup.isNumeric()) {
                        return new Tuplet_1.Tuplet(Number(tup));
                    }
                }
            }
            else {
                return new UnrecognizedToken_1.UnrecognizedToken('(');
            }
        }
        // Measure
        if (char === '|') {
            const next1 = this.nextChar(false);
            if (next1 !== '|') {
                return new Measure_1.Measure();
            }
            else {
                this.incPointer();
                const next2 = this.nextChar(false);
                if (next2 !== ':') {
                    return new Terminal_1.Terminal();
                }
                else {
                    this.incPointer();
                    return new Repeat_1.Repeat(TokenType_1.PairType.Left);
                }
            }
        }
        if (char === ':') {
            const next1 = this.nextChar(false);
            if (next1 !== '|') {
                return new UnrecognizedToken_1.UnrecognizedToken(':');
            }
            else {
                this.incPointer();
                const next2 = this.nextChar(false);
                if (next2 !== '|') {
                    return new UnrecognizedToken_1.UnrecognizedToken(':|');
                }
                else {
                    this.incPointer();
                    return new Repeat_1.Repeat(TokenType_1.PairType.Right);
                }
            }
        }
        // RepeatSkip
        if (char === '[') {
            const skip = this.fetchUntil(']');
            if (skip) {
                let parts = skip.split('.');
                if (parts.length >= 2 && parts.last() === '') {
                    parts = parts.slice(0, -1);
                    if (parts.every((value) => value.isNumeric())) {
                        const numParts = parts.map((value) => Number(value));
                        return new RepeatSkip_1.RepeatSkip(numParts);
                    }
                }
                else {
                    return new UnrecognizedToken_1.UnrecognizedToken(`[${skip}]`);
                }
            }
            else {
                return new UnrecognizedToken_1.UnrecognizedToken('[');
            }
        }
        // Setting
        if (char === '<') {
            const setting = this.fetchUntil('>');
            if (setting) {
                return new Setting_1.Setting(setting);
            }
            else {
                return new UnrecognizedToken_1.UnrecognizedToken('<');
            }
        }
        // Comment
        if (char === '/') {
            const next = this.nextChar(false);
            if (next !== '/') {
                return new UnrecognizedToken_1.UnrecognizedToken('/');
            }
            this.incPointer();
            return new Comment_1.Comment(this.fetchUntil('\n'));
        }
        if (char === '\n' || char === ' ') {
            return undefined;
        }
        return new UnrecognizedToken_1.UnrecognizedToken(char);
    }
    nextChar(incPointer = true) {
        if (this.isEnded()) {
            return undefined;
        }
        const ret = this.content.charAt(this.pointer);
        if (incPointer) {
            this.pointer += 1;
        }
        return ret;
    }
    incPointer(offset = 1) {
        this.pointer += offset;
    }
    isEnded() {
        return this.pointer >= this.length;
    }
    fetchUntil(bound) {
        const boundIndex = this.content.indexOf(bound, this.pointer);
        if (boundIndex === -1) {
            return undefined;
        }
        const res = this.content.slice(this.pointer, boundIndex);
        this.pointer = boundIndex + 1;
        return res;
    }
}
Tokenizer.SuffixDict = {
    '\'': TokenType_1.SuffixType.DotAbove,
    ',': TokenType_1.SuffixType.DotBelow,
    'b': TokenType_1.SuffixType.Flat,
    '#': TokenType_1.SuffixType.Sharp,
    '-': TokenType_1.SuffixType.Dash,
    '_': TokenType_1.SuffixType.Underline,
    '.': TokenType_1.SuffixType.DotAfter,
};
Tokenizer.Suffix = new Set(Object.keys(Tokenizer.SuffixDict));
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map