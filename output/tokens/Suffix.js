"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_js_1 = require("./BaseToken.js");
const TokenType_1 = require("./TokenType");
class Suffix extends BaseToken_js_1.BaseToken {
    constructor(suffix) {
        super(TokenType_1.TokenType.Suffix);
        this.suffixType = suffix;
    }
    toString() {
        return Object.getKeyByValue(Suffix.SuffixDict, this.suffixType);
    }
}
Suffix.SuffixDict = {
    '\'': TokenType_1.SuffixType.DotAbove,
    ',': TokenType_1.SuffixType.DotBelow,
    'b': TokenType_1.SuffixType.Flat,
    '#': TokenType_1.SuffixType.Sharp,
    '-': TokenType_1.SuffixType.Dash,
    '_': TokenType_1.SuffixType.Underline,
    '.': TokenType_1.SuffixType.DotAfter,
};
Suffix.Suffix = new Set(Object.keys(Suffix.SuffixDict));
exports.Suffix = Suffix;
//# sourceMappingURL=Suffix.js.map