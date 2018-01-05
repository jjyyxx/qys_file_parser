"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Staff"] = 0] = "Staff";
    TokenType[TokenType["Suffix"] = 1] = "Suffix";
    TokenType[TokenType["Tie"] = 2] = "Tie";
    TokenType[TokenType["Chord"] = 3] = "Chord";
    TokenType[TokenType["Tuplet"] = 4] = "Tuplet";
    TokenType[TokenType["Appoggiatura"] = 5] = "Appoggiatura";
    TokenType[TokenType["Setting"] = 6] = "Setting";
    TokenType[TokenType["Measure"] = 7] = "Measure";
    TokenType[TokenType["Comment"] = 8] = "Comment";
    TokenType[TokenType["Repeat"] = 9] = "Repeat";
    TokenType[TokenType["RepeatSkip"] = 10] = "RepeatSkip";
    TokenType[TokenType["Terminal"] = 11] = "Terminal";
    TokenType[TokenType["Unrecognized"] = 12] = "Unrecognized";
})(TokenType || (TokenType = {}));
exports.TokenType = TokenType;
var SuffixType;
(function (SuffixType) {
    SuffixType[SuffixType["Flat"] = 0] = "Flat";
    SuffixType[SuffixType["Sharp"] = 1] = "Sharp";
    SuffixType[SuffixType["DotAbove"] = 2] = "DotAbove";
    SuffixType[SuffixType["DotBelow"] = 3] = "DotBelow";
    SuffixType[SuffixType["DotAfter"] = 4] = "DotAfter";
    SuffixType[SuffixType["Underline"] = 5] = "Underline";
    SuffixType[SuffixType["Dash"] = 6] = "Dash";
})(SuffixType || (SuffixType = {}));
exports.SuffixType = SuffixType;
var PairType;
(function (PairType) {
    PairType[PairType["Left"] = 0] = "Left";
    PairType[PairType["Right"] = 1] = "Right";
})(PairType || (PairType = {}));
exports.PairType = PairType;
//# sourceMappingURL=TokenType.js.map