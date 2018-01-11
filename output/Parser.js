"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appoggiatura_1 = require("./components/Appoggiatura");
const ParsedChord_1 = require("./components/ParsedChord");
const ParsedStaff_1 = require("./components/ParsedStaff");
const ParsedTie_1 = require("./components/ParsedTie");
const ParsedTuplet_1 = require("./components/ParsedTuplet");
const index_1 = require("./index");
const TokenType_1 = require("./tokens/TokenType");
class Parser {
    // public parsed: any[]
    constructor(tokens) {
        this.tokens = tokens;
    }
    parse() {
        this.removeDup();
        const cleaned = this.clean();
        const appoggiaturaParsed = this.parseAppoggiatura(cleaned);
        const tupletParsed = this.parseTuplet(appoggiaturaParsed);
        const tieParsed = this.parseTie(tupletParsed);
        const chordParsed = this.parseChord(tieParsed);
    }
    parseAppoggiatura(cleaned) {
        let pointer = 0;
        const length = cleaned.length;
        const parsed = [];
        while (pointer < length) {
            const element = cleaned[pointer];
            if (element.type === TokenType_1.TokenType.AppoggiaturaBound && element.leftOrRight === index_1.PairType.Left) {
                const index = cleaned.slice(pointer + 1).findIndex((value) => value.type === TokenType_1.TokenType.AppoggiaturaBound
                    && value.leftOrRight === index_1.PairType.Right);
                parsed.push(new Appoggiatura_1.Appoggiatura(cleaned.slice(pointer + 1, index)));
                pointer = index;
            }
            else {
                parsed.push(element);
            }
            pointer += 1;
        }
        return parsed;
    }
    parseTuplet(appoggiaturaParsed) {
        let pointer = 0;
        const length = appoggiaturaParsed.length;
        const parsed = [];
        while (pointer < length) {
            const element = appoggiaturaParsed[pointer];
            if (element.type === TokenType_1.TokenType.Tuplet) {
                parsed.push(new ParsedTuplet_1.ParsedTuplet(appoggiaturaParsed.slice(pointer + 1, pointer + 1 + element.count)));
                pointer += element.count;
            }
            else {
                parsed.push(element);
            }
            pointer += 1;
        }
        return parsed;
    }
    parseTie(tupletParsed) {
        let pointer = 0;
        const length = tupletParsed.length;
        const parsed = [];
        while (pointer < length) {
            const element = tupletParsed[pointer];
            if (element.type === TokenType_1.TokenType.Tie) {
                pointer += 1;
                const left = parsed.pop();
                parsed.push(new ParsedTie_1.ParsedTie(left, tupletParsed[pointer]));
            }
            else {
                parsed.push(element);
            }
            pointer += 1;
        }
        return parsed;
    }
    parseChord(tieParsed) {
        let pointer = 0;
        const length = tieParsed.length;
        const parsed = [];
        while (pointer < length) {
            const element = tieParsed[pointer];
            if (element.type === TokenType_1.TokenType.Chord) {
                pointer += 1;
                const left = parsed.pop();
                parsed.push(new ParsedChord_1.ParsedChord(left, tieParsed[pointer]));
            }
            else {
                parsed.push(element);
            }
            pointer += 1;
        }
        return parsed;
    }
    removeDup() {
        let pointer = 0;
        const length = this.tokens.length;
        let lastStaff;
        while (pointer < length) {
            const element = this.tokens[pointer];
            if (element.type === TokenType_1.TokenType.Staff) {
                const curStaff = element;
                if (curStaff.isDuplicate) {
                    curStaff.alterDup(lastStaff.pitch, lastStaff.beatCount);
                }
                else {
                    lastStaff = curStaff;
                }
            }
            pointer += 1;
        }
    }
    clean() {
        let pointer = 0;
        const cleaned = [];
        const length = this.tokens.length;
        let settingContext = {};
        while (pointer < length) {
            const element = this.tokens[pointer];
            if (element.type === TokenType_1.TokenType.Staff) {
                const curStaff = element;
                cleaned.push(new ParsedStaff_1.ParsedStaff(curStaff, settingContext));
            }
            else if (element.type === TokenType_1.TokenType.Setting) {
                const curSetting = element;
                const newSetting = {};
                Object.assign(newSetting, settingContext, Object.reverseFrom(curSetting.settings));
                settingContext = newSetting;
            }
            else if (element.type !== TokenType_1.TokenType.Comment && element.type !== TokenType_1.TokenType.MeasureBound) {
                cleaned.push(element);
            }
            pointer += 1;
        }
        return cleaned;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map