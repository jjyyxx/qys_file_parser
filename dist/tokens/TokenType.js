var TokenType;
(function (TokenType) {
    TokenType[TokenType["Note"] = 0] = "Note";
    TokenType[TokenType["Suffix"] = 1] = "Suffix";
    TokenType[TokenType["Tie"] = 2] = "Tie";
    TokenType[TokenType["Fermata"] = 3] = "Fermata";
    TokenType[TokenType["Portamento"] = 4] = "Portamento";
    TokenType[TokenType["Tremolo1"] = 5] = "Tremolo1";
    TokenType[TokenType["Tremolo2"] = 6] = "Tremolo2";
    TokenType[TokenType["Tuplet"] = 7] = "Tuplet";
    TokenType[TokenType["Appoggiatura"] = 8] = "Appoggiatura";
    TokenType[TokenType["MeasureBound"] = 9] = "MeasureBound";
    TokenType[TokenType["Comment"] = 10] = "Comment";
    TokenType[TokenType["RepeatSkip"] = 11] = "RepeatSkip";
    TokenType[TokenType["Function"] = 12] = "Function";
    TokenType[TokenType["FunctionSimplified"] = 13] = "FunctionSimplified";
    TokenType[TokenType["Pitch"] = 14] = "Pitch";
    TokenType[TokenType["Unrecognized"] = 15] = "Unrecognized";
})(TokenType || (TokenType = {}));
var StructureType;
(function (StructureType) {
    StructureType[StructureType["Header"] = 0] = "Header";
    StructureType[StructureType["Section"] = 1] = "Section";
})(StructureType || (StructureType = {}));
var SuffixType;
(function (SuffixType) {
    SuffixType[SuffixType["Flat"] = 0] = "Flat";
    SuffixType[SuffixType["Sharp"] = 1] = "Sharp";
    SuffixType[SuffixType["DotAbove"] = 2] = "DotAbove";
    SuffixType[SuffixType["DotBelow"] = 3] = "DotBelow";
    SuffixType[SuffixType["DotAfter"] = 4] = "DotAfter";
    SuffixType[SuffixType["Underline"] = 5] = "Underline";
    SuffixType[SuffixType["Dash"] = 6] = "Dash";
    SuffixType[SuffixType["Staccato"] = 7] = "Staccato";
})(SuffixType || (SuffixType = {}));
var BoundType;
(function (BoundType) {
    BoundType[BoundType["Normal"] = 0] = "Normal";
    BoundType[BoundType["Terminal"] = 1] = "Terminal";
    BoundType[BoundType["RepeatLeft"] = 2] = "RepeatLeft";
    BoundType[BoundType["RepeatRight"] = 3] = "RepeatRight";
    BoundType[BoundType["RepeatBoth"] = 4] = "RepeatBoth";
})(BoundType || (BoundType = {}));
export { TokenType, StructureType, SuffixType, BoundType };
//# sourceMappingURL=TokenType.js.map