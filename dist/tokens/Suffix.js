var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseToken } from './BaseToken.js';
import { Token } from './TokenDecorator';
import { SuffixType, TokenType } from './TokenType';
let Suffix = Suffix_1 = class Suffix extends BaseToken {
    constructor(matched) {
        super(TokenType.Suffix);
        const suffix = matched[0];
        if (suffix.charAt(0) === '.') {
            this.dotCount = suffix.length;
            this.suffixType = SuffixType.DotAfter;
        }
        else {
            this.dotCount = 0;
            this.suffixType = Suffix_1.SuffixDict[suffix];
        }
    }
    toString() {
        return Object.getKeyByValue(Suffix_1.SuffixDict, this.suffixType);
    }
};
Suffix.pattern = /^('|,|b|#|\-|_|\.+)/;
Suffix.SuffixDict = {
    '\'': SuffixType.DotAbove,
    ',': SuffixType.DotBelow,
    'b': SuffixType.Flat,
    '#': SuffixType.Sharp,
    '-': SuffixType.Dash,
    '_': SuffixType.Underline,
    '`': SuffixType.Staccato,
    '.': SuffixType.DotAfter,
};
Suffix = Suffix_1 = __decorate([
    Token
], Suffix);
export { Suffix };
var Suffix_1;
//# sourceMappingURL=Suffix.js.map