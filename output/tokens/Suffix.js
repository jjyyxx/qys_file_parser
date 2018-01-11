"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseToken_js_1 = require("./BaseToken.js");
const TokenDecorator_1 = require("./TokenDecorator");
const TokenType_1 = require("./TokenType");
let Suffix = Suffix_1 = class Suffix extends BaseToken_js_1.BaseToken {
    constructor(suffix) {
        super(TokenType_1.TokenType.Suffix);
        this.suffixType = suffix;
    }
    toString() {
        return Object.getKeyByValue(Suffix_1.SuffixDict, this.suffixType);
    }
};
Suffix.pattern = /./;
Suffix.SuffixDict = {
    '\'': TokenType_1.SuffixType.DotAbove,
    ',': TokenType_1.SuffixType.DotBelow,
    'b': TokenType_1.SuffixType.Flat,
    '#': TokenType_1.SuffixType.Sharp,
    '-': TokenType_1.SuffixType.Dash,
    '_': TokenType_1.SuffixType.Underline,
    '.': TokenType_1.SuffixType.DotAfter,
};
Suffix.Suffix = new Set(Object.keys(Suffix_1.SuffixDict));
Suffix = Suffix_1 = __decorate([
    TokenDecorator_1.Token
], Suffix);
exports.Suffix = Suffix;
var Suffix_1;
//# sourceMappingURL=Suffix.js.map