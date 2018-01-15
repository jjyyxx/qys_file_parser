var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("tokens/TokenType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["Note"] = 0] = "Note";
        TokenType[TokenType["Suffix"] = 1] = "Suffix";
        TokenType[TokenType["Tie"] = 2] = "Tie";
        TokenType[TokenType["Chord"] = 3] = "Chord";
        TokenType[TokenType["Tuplet"] = 4] = "Tuplet";
        TokenType[TokenType["Appoggiatura"] = 5] = "Appoggiatura";
        TokenType[TokenType["MeasureBound"] = 6] = "MeasureBound";
        TokenType[TokenType["Comment"] = 7] = "Comment";
        TokenType[TokenType["RepeatBound"] = 8] = "RepeatBound";
        TokenType[TokenType["RepeatSkip"] = 9] = "RepeatSkip";
        TokenType[TokenType["Terminal"] = 10] = "Terminal";
        TokenType[TokenType["Function"] = 11] = "Function";
        TokenType[TokenType["FunctionSimplified"] = 12] = "FunctionSimplified";
        TokenType[TokenType["Unrecognized"] = 13] = "Unrecognized";
    })(TokenType || (TokenType = {}));
    exports.TokenType = TokenType;
    var StructureType;
    (function (StructureType) {
        StructureType[StructureType["Header"] = 0] = "Header";
        StructureType[StructureType["Section"] = 1] = "Section";
    })(StructureType || (StructureType = {}));
    exports.StructureType = StructureType;
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
});
define("tokens/BaseToken", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Base {
        constructor(type) {
            this.type = type;
        }
    }
    exports.Base = Base;
    // tslint:disable-next-line:max-classes-per-file
    class BaseToken extends Base {
    }
    exports.BaseToken = BaseToken;
    // tslint:disable-next-line:max-classes-per-file
    class BaseStructure extends Base {
    }
    exports.BaseStructure = BaseStructure;
});
define("tokens/UnrecognizedToken", ["require", "exports", "tokens/BaseToken", "tokens/TokenType"], function (require, exports, BaseToken_1, TokenType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UnrecognizedToken extends BaseToken_1.BaseToken {
        constructor(token) {
            super(TokenType_1.TokenType.Unrecognized);
            this.token = token;
        }
        toString() {
            return this.token;
        }
    }
    exports.UnrecognizedToken = UnrecognizedToken;
});
define("Global", ["require", "exports", "tokens/UnrecognizedToken"], function (require, exports, UnrecognizedToken_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Global {
        static RegisterTokenPattern(constuctor, pattern) {
            Global.TokenPatterns.push({
                constuctor,
                pattern,
            });
        }
        static RegisterStructurePattern(constuctor, pattern) {
            Global.StructurePatterns.push({
                constuctor,
                pattern,
            });
        }
        static isLegalSetting(key) {
            return Global.legalSettings.has(key);
        }
        static isLegalTonality(key) {
            return Global.legalTonality.has(key);
        }
    }
    Global.TokenPatterns = [];
    Global.StructurePatterns = [];
    Global.FallbackToken = UnrecognizedToken_1.UnrecognizedToken;
    Global.tonalityDict = {
        // tslint:disable-next-line:object-literal-sort-keys
        'C': 0, 'G': 7, 'D': 2, 'A': -3, 'E': 4,
        'B': -1, '#F': 6, '#C': 1, 'F': 5, 'bB': -2,
        'bE': 3, 'bA': -4, 'bD': 1, 'bG': 6, 'bC': -1,
        'F#': 6, 'C#': 1, 'Bb': -2, 'Gb': 6,
        'Eb': 3, 'Ab': -4, 'Db': 1, 'Cb': -1,
    };
    Global.legalTonality = new Set(Object.keys(Global.tonalityDict));
    Global.legalSettings = new Set([
        'Key', 'Bar', 'Beat', 'Speed', 'Volume', 'Instr', 'Stac',
        'Port', 'Appo', 'Dur', 'Oct', 'FadeIn', 'FadeOut',
    ]);
    Global.SortedTonality = Object.keys(Global.tonalityDict).sort((a, b) => {
        return a.length > b.length ? -1 : 1;
    });
    exports.Global = Global;
});
define("tokens/TokenDecorator", ["require", "exports", "Global"], function (require, exports, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // TODO: consider refactoring
    function Token(constructor) {
        Global_1.Global.RegisterTokenPattern(constructor, constructor.pattern);
    }
    exports.Token = Token;
    function Structure(constructor) {
        Global_1.Global.RegisterStructurePattern(constructor, constructor.pattern);
    }
    exports.Structure = Structure;
});
define("tokens/Comment", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_2, TokenDecorator_1, TokenType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Comment = class Comment extends BaseToken_2.BaseToken {
        constructor(matched) {
            super(TokenType_2.TokenType.Comment);
            this.comment = matched[0].slice(2, -1);
        }
        toString() {
            return `//${this.comment}\n`;
        }
    };
    Comment.pattern = /^\/\/.*\n/;
    Comment = __decorate([
        TokenDecorator_1.Token
    ], Comment);
    exports.Comment = Comment;
});
define("Tokenizer", ["require", "exports", "Global", "TokenizedData"], function (require, exports, Global_2, TokenizedData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tokenizer {
        static tokenize(content, patterns = Global_2.Global.TokenPatterns) {
            const result = [];
            while (content.length > 0) {
                const matchedPattern = patterns.find((patternObj) => patternObj.pattern.test(content));
                if (matchedPattern) {
                    const matchedText = content.match(matchedPattern.pattern);
                    try {
                        result.push(new matchedPattern.constuctor(matchedText));
                    }
                    catch (error) {
                        result.push(new Global_2.Global.FallbackToken(matchedText[0])); // FIXME: better way
                    }
                    content = content.slice(matchedText[0].length);
                }
                else {
                    result.push(new Global_2.Global.FallbackToken(content.charAt(0))); // FIXME: better way
                    content = content.slice(1);
                }
            }
            return result;
        }
        constructor(content) {
            this.content = content;
            this.tokenizedData = new TokenizedData_1.TokenizedData();
        }
        tokenize() {
            this.separateGlobalComments();
            this.tokenizedData.Sections = Tokenizer.tokenize(this.content, Global_2.Global.StructurePatterns);
            return this.tokenizedData;
        }
        separateGlobalComments() {
            const matchedGlobalComments = this.content.match(/^(\/\/.*\n)+\n/);
            if (matchedGlobalComments) {
                this.tokenizedData.Comments = Tokenizer.tokenize(matchedGlobalComments[0]);
                this.content = this.content.slice(matchedGlobalComments[0].length);
            }
        }
    }
    exports.Tokenizer = Tokenizer;
});
define("tokens/Function", ["require", "exports", "Global", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, Global_3, BaseToken_3, TokenDecorator_2, TokenType_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let FunctionToken = FunctionToken_1 = class FunctionToken extends BaseToken_3.BaseToken {
        constructor(matched) {
            super(TokenType_3.TokenType.Function);
            const { key, value } = FunctionToken_1.parse(matched[0].slice(1, -1));
            this.Name = key;
            this.Argument = value;
        }
        static parse(content) {
            const possibleKVPair = content.split(':').map((item) => item.trim());
            if (Global_3.Global.isLegalSetting(possibleKVPair[0])) {
                return { key: possibleKVPair[0], value: possibleKVPair[1].toNumIfPossible() };
            }
        }
        toString() {
            return `<${this.Name}:${this.Argument}>`;
        }
    };
    FunctionToken.pattern = /^<[^:>]+:[^:>]+>/;
    FunctionToken = FunctionToken_1 = __decorate([
        TokenDecorator_2.Token
    ], FunctionToken);
    exports.FunctionToken = FunctionToken;
    var FunctionToken_1;
});
define("tokens/FunctionSimplified", ["require", "exports", "Global", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, Global_4, BaseToken_4, TokenDecorator_3, TokenType_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let FunctionSimplified = FunctionSimplified_1 = class FunctionSimplified extends BaseToken_4.BaseToken {
        constructor(matched) {
            super(TokenType_4.TokenType.FunctionSimplified);
            const KVArray = FunctionSimplified_1.parse(matched[0].slice(1, -1));
            if (KVArray.length === 1) {
                this.Name = KVArray[0].key;
                this.Argument = KVArray[0].value;
            }
            else {
                this.Name = KVArray.map((KVPair) => KVPair.key).reduce((pre, cur) => `${pre}&${cur}`);
                this.Argument = Object.reverseFrom(KVArray);
            }
        }
        static parse(content) {
            const finalSetting = [];
            if (content.isNumeric()) {
                return [{ key: 'Speed', value: Number(content) }];
            }
            if (content.endsWith('%') && content.slice(0, -1).isNumeric()) {
                return [{ key: 'Speed', value: Number(content.slice(0, -1)) }];
            }
            const possibleBeatTuple = content.toFraction();
            if (possibleBeatTuple) {
                return [
                    { key: 'Bar', value: possibleBeatTuple.Numerator },
                    { key: 'Beat', value: possibleBeatTuple.Denominator },
                ];
            }
            if (content.startsWith('1=')) {
                const result = FunctionSimplified_1.parseTonality(content.slice(2));
                if (result) {
                    return result;
                }
                else {
                    throw new Error('illegal setting');
                }
            }
            if (content.startsWith('{') && content.endsWith('}')) {
                return [
                    { key: 'Instr', value: content.slice(1, -1) },
                ];
            }
            throw new Error('illegal setting');
        }
        static parseTonality(possibleKey) {
            if (possibleKey.endsWith('\'')) {
                const result = FunctionSimplified_1.calcOctave(possibleKey, '\'');
                if (result) {
                    return [
                        { key: 'Key', value: result.key },
                        { key: 'Oct', value: result.octave },
                    ];
                }
                else {
                    return undefined;
                }
            }
            else if (possibleKey.endsWith(',')) {
                const result = FunctionSimplified_1.calcOctave(possibleKey, ',');
                if (result) {
                    return [
                        { key: 'Key', value: result.key },
                        { key: 'Oct', value: -result.octave },
                    ];
                }
                else {
                    return undefined;
                }
            }
            else if (Global_4.Global.isLegalTonality(possibleKey)) {
                return [{
                        key: 'Key',
                        value: Global_4.Global.tonalityDict[possibleKey],
                    }];
            }
            else {
                return undefined;
            }
        }
        static calcOctave(content, char) {
            const firstOccurance = content.indexOf(char);
            const remain = content.slice(0, firstOccurance);
            if (Global_4.Global.isLegalTonality(remain)) {
                return {
                    key: Global_4.Global.tonalityDict[remain],
                    octave: content.length - firstOccurance,
                };
            }
            else {
                return undefined;
            }
        }
        toString() {
            return `<${this.reverse()}>`;
        }
        reverse() {
            switch (this.Name) {
                case 'Volume':
                    return Number.isInteger(this.Argument)
                        ? this.Argument.toString() + '.0'
                        : this.Argument.toString();
                case 'Speed':
                    return this.Argument.toString();
                case 'Bar&Beat':
                    return this.Argument.Bar.toString() + '/' + this.Argument.Beat.toString();
                case 'Key':
                    return `1=${Object.getKeyByValue(Global_4.Global.tonalityDict, this.Argument)}`;
                case 'Key&Oct':
                    const octave = this.Argument.Oct;
                    const suffix = octave > 0 ? '\''.repeat(octave) : ','.repeat(-octave);
                    return `1=${Object.getKeyByValue(Global_4.Global.tonalityDict, this.Argument.Key)}${suffix}`;
            }
        }
    };
    FunctionSimplified.pattern = /^(<[^:>]+>|{[^}]+})/; // TODO: consider a more strict one
    FunctionSimplified = FunctionSimplified_1 = __decorate([
        TokenDecorator_3.Token
    ], FunctionSimplified);
    exports.FunctionSimplified = FunctionSimplified;
    var FunctionSimplified_1;
});
define("tokens/Section", ["require", "exports", "Tokenizer", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, Tokenizer_1, BaseToken_5, TokenDecorator_4, TokenType_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Section = Section_1 = class Section extends BaseToken_5.BaseStructure {
        constructor(matched) {
            super(TokenType_5.StructureType.Section);
            let content = matched[0];
            const { remainedContent, Comments } = Section_1.separateComments(content);
            content = remainedContent;
            this.Comments = Comments;
            const splitted = content.split('\n');
            if (splitted[0].startsWith('<')) {
                this.GlobalSettings = Tokenizer_1.Tokenizer.tokenize(splitted[0]);
                this.Tracks = splitted.slice(1).filter((track) => track !== '').map((track) => Tokenizer_1.Tokenizer.tokenize(track));
            }
            else {
                this.GlobalSettings = [];
                this.Tracks = splitted.map((track) => Tokenizer_1.Tokenizer.tokenize(track));
            }
        }
        static separateComments(content) {
            const matchedGlobalComments = content.match(/^(\/\/.*\n)+/);
            let Comments;
            let remainedContent;
            if (matchedGlobalComments) {
                Comments = Tokenizer_1.Tokenizer.tokenize(matchedGlobalComments[0]);
                remainedContent = content.slice(matchedGlobalComments[0].length);
            }
            else {
                Comments = [];
                remainedContent = content;
            }
            return {
                Comments,
                remainedContent,
            };
        }
        toString() {
            const commentString = this.Comments.map((comment) => comment.toString()).reduce((pre, cur) => pre + cur, '');
            const settingString = this.GlobalSettings.length === 0
                ? ''
                : this.GlobalSettings
                    .map((functionToken) => functionToken.toString())
                    .reduce((pre, cur) => pre + cur, '') + '\n';
            const trackString = this.Tracks
                .map((track) => track
                .map((token) => token.toString())
                .reduce((pre, cur) => pre + cur) + '\n')
                .reduce((pre, cur) => pre + cur, '');
            return commentString + settingString + trackString + '\n';
        }
    };
    Section.pattern = /^(.+\n)*.+(\n\n|\n$|$)/; // /^[<0-7](.+\n)*(.*)(\n|\n\n|$)/
    Section = Section_1 = __decorate([
        TokenDecorator_4.Structure
    ], Section);
    exports.Section = Section;
    var Section_1;
});
define("TokenizedData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TokenizedData {
        constructor() {
            this.Comments = [];
            this.Sections = [];
        }
        toString() {
            const commentString = this.Comments.length === 0
                ? ''
                : this.Comments
                    .map((comment) => comment.toString())
                    .reduce((pre, cur) => pre + cur, '') + '\n';
            const sectionString = this.Sections.map((section) => section.toString()).reduce((pre, cur) => pre + cur);
            return commentString + sectionString;
        }
    }
    exports.TokenizedData = TokenizedData;
});
define("Detokenizer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Detokenizer {
        constructor(tokenizedData) {
            this.tokenizedData = tokenizedData;
        }
        detokenize() {
            return this.tokenizedData.toString();
        }
    }
    exports.Detokenizer = Detokenizer;
});
define("tokens/Suffix", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_js_1, TokenDecorator_5, TokenType_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Suffix = Suffix_1 = class Suffix extends BaseToken_js_1.BaseToken {
        constructor(matched) {
            super(TokenType_6.TokenType.Suffix);
            const suffix = matched[0];
            if (suffix.charAt(0) === '.') {
                this.dotCount = suffix.length;
                this.suffixType = TokenType_6.SuffixType.DotAfter;
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
        '\'': TokenType_6.SuffixType.DotAbove,
        ',': TokenType_6.SuffixType.DotBelow,
        'b': TokenType_6.SuffixType.Flat,
        '#': TokenType_6.SuffixType.Sharp,
        '-': TokenType_6.SuffixType.Dash,
        '_': TokenType_6.SuffixType.Underline,
        '.': TokenType_6.SuffixType.DotAfter,
    };
    Suffix = Suffix_1 = __decorate([
        TokenDecorator_5.Token
    ], Suffix);
    exports.Suffix = Suffix;
    var Suffix_1;
});
define("tokens/Note", ["require", "exports", "Tokenizer", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, Tokenizer_2, BaseToken_js_2, TokenDecorator_6, TokenType_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Note = class Note extends BaseToken_js_2.BaseToken {
        constructor(matched) {
            super(TokenType_7.TokenType.Note);
            const pitchPart = matched[0].match(/^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*/)[0];
            this.parsePitch(pitchPart);
            this.Suffix = Tokenizer_2.Tokenizer.tokenize(matched[0].slice(pitchPart.length));
        }
        parsePitch(pitchPart) {
            const pitches = pitchPart.split('&');
            this.Pitches = pitches.map((pitch) => {
                const index = pitch.search(/[0-7%]/);
                const scaleDegree = pitch.charAt(index);
                return {
                    ScaleDegree: scaleDegree === '%' ? -1 : Number(scaleDegree),
                    Suffix: Tokenizer_2.Tokenizer.tokenize(pitch.slice(0, index) + pitch.slice(index + 1)),
                };
            });
        }
        toString() {
            const prefixString = this;
            const suffixString = this.Suffix.map((value) => value.toString()).reduce((pre, cur) => pre + cur, '');
            const pitchString = this.Pitches.map((pitch) => {
                const index = pitch.Suffix.findIndex((suffix) => suffix.suffixType !== TokenType_7.SuffixType.Flat && suffix.suffixType !== TokenType_7.SuffixType.Sharp);
                return ''.concat(...pitch.Suffix.slice(1, index).map((suffix) => suffix.toString()), pitch.ScaleDegree === -1 ? '%' : pitch.ScaleDegree.toString(), ...pitch.Suffix.slice(index).map((suffix) => suffix.toString()));
            }).reduce((pre, cur) => `${pre}&${cur}`);
            return pitchString + suffixString;
        }
    };
    Note.pattern = /^[b#]*[0-7%][',]*(&[b#]*[0-7%][',]*)*[.\-_]*/;
    Note.pitchDict = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
    Note = __decorate([
        TokenDecorator_6.Token
    ], Note);
    exports.Note = Note;
});
define("tokens/Appoggiatura", ["require", "exports", "Tokenizer", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, Tokenizer_3, BaseToken_6, TokenDecorator_7, TokenType_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Appoggiatura = class Appoggiatura extends BaseToken_6.BaseToken {
        constructor(matched) {
            super(TokenType_8.TokenType.Appoggiatura);
            this.Notes = Tokenizer_3.Tokenizer.tokenize(matched[0].slice(1, -2));
        }
        toString() {
            return `(${this.Notes.map((note) => note.toString()).reduce((pre, cur) => pre + cur)}^)`;
        }
    };
    Appoggiatura.pattern = /^\([^)]+\^\)/;
    Appoggiatura = __decorate([
        TokenDecorator_7.Token
    ], Appoggiatura);
    exports.Appoggiatura = Appoggiatura;
});
define("tokens/MeasureBound", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_7, TokenDecorator_8, TokenType_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let MeasureBound = class MeasureBound extends BaseToken_7.BaseToken {
        constructor() {
            super(TokenType_9.TokenType.MeasureBound);
        }
        toString() {
            return '|';
        }
    };
    MeasureBound.pattern = /^\|(?!\|)/;
    MeasureBound = __decorate([
        TokenDecorator_8.Token
    ], MeasureBound);
    exports.MeasureBound = MeasureBound;
});
define("tokens/RepeatBound", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_8, TokenDecorator_9, TokenType_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let RepeatBound = class RepeatBound extends BaseToken_8.BaseToken {
        constructor(matched) {
            super(TokenType_10.TokenType.RepeatBound);
            switch (matched[0]) {
                case '||:':
                    this.leftOrRight = TokenType_10.PairType.Left;
                    break;
                case ':||':
                    this.leftOrRight = TokenType_10.PairType.Right;
                    break;
            }
        }
        toString() {
            return this.leftOrRight === TokenType_10.PairType.Left ? '||:' : ':||';
        }
    };
    RepeatBound.pattern = /^(\|\|:|:\|\|)/;
    RepeatBound = __decorate([
        TokenDecorator_9.Token
    ], RepeatBound);
    exports.RepeatBound = RepeatBound;
});
define("tokens/RepeatSkip", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_9, TokenDecorator_10, TokenType_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let RepeatSkip = class RepeatSkip extends BaseToken_9.BaseToken {
        constructor(matched) {
            super(TokenType_11.TokenType.RepeatSkip);
            this.parts = matched[0].slice(1, -2).split('.').map((x) => Number(x));
        }
        toString() {
            return `[${this.parts.map((value) => value.toString() + '.').reduce((pre, cur) => pre + cur)}]`;
        }
    };
    RepeatSkip.pattern = /^\[(\d+.)+\]/;
    RepeatSkip = __decorate([
        TokenDecorator_10.Token
    ], RepeatSkip);
    exports.RepeatSkip = RepeatSkip;
});
define("tokens/Terminal", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_10, TokenDecorator_11, TokenType_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Terminal = class Terminal extends BaseToken_10.BaseToken {
        constructor() {
            super(TokenType_12.TokenType.Terminal);
        }
        toString() {
            return '||';
        }
    };
    Terminal.pattern = /^\|\|(?!\:)/;
    Terminal = __decorate([
        TokenDecorator_11.Token
    ], Terminal);
    exports.Terminal = Terminal;
});
define("tokens/Tie", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_11, TokenDecorator_12, TokenType_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Tie = class Tie extends BaseToken_11.BaseToken {
        constructor() {
            super(TokenType_13.TokenType.Tie);
        }
        toString() {
            return '^';
        }
    };
    Tie.pattern = /^\^/;
    Tie = __decorate([
        TokenDecorator_12.Token
    ], Tie);
    exports.Tie = Tie;
});
define("tokens/Tuplet", ["require", "exports", "tokens/BaseToken", "tokens/TokenDecorator", "tokens/TokenType"], function (require, exports, BaseToken_12, TokenDecorator_13, TokenType_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Tuplet = class Tuplet extends BaseToken_12.BaseToken {
        constructor(matched) {
            super(TokenType_14.TokenType.Tuplet);
            this.count = Number(matched[0].slice(1, -1));
        }
        toString() {
            return `(${this.count})`;
        }
    };
    Tuplet.pattern = /^\(\d+\)/;
    Tuplet = __decorate([
        TokenDecorator_13.Token
    ], Tuplet);
    exports.Tuplet = Tuplet;
});
define("tokens/index", ["require", "exports", "tokens/Appoggiatura", "tokens/BaseToken", "tokens/Comment", "tokens/Function", "tokens/FunctionSimplified", "tokens/MeasureBound", "tokens/Note", "tokens/RepeatBound", "tokens/RepeatSkip", "tokens/Suffix", "tokens/Terminal", "tokens/Tie", "tokens/TokenDecorator", "tokens/TokenType", "tokens/Tuplet", "tokens/UnrecognizedToken", "tokens/Section"], function (require, exports, Appoggiatura_1, BaseToken_13, Comment_1, Function_1, FunctionSimplified_2, MeasureBound_1, Note_1, RepeatBound_1, RepeatSkip_1, Suffix_2, Terminal_1, Tie_1, TokenDecorator_14, TokenType_15, Tuplet_1, UnrecognizedToken_2, Section_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Appoggiatura = Appoggiatura_1.Appoggiatura;
    exports.BaseToken = BaseToken_13.BaseToken;
    exports.Comment = Comment_1.Comment;
    exports.FunctionToken = Function_1.FunctionToken;
    exports.FunctionSimplified = FunctionSimplified_2.FunctionSimplified;
    exports.MeasureBound = MeasureBound_1.MeasureBound;
    exports.Note = Note_1.Note;
    exports.RepeatBound = RepeatBound_1.RepeatBound;
    exports.RepeatSkip = RepeatSkip_1.RepeatSkip;
    exports.Suffix = Suffix_2.Suffix;
    exports.Terminal = Terminal_1.Terminal;
    exports.Tie = Tie_1.Tie;
    exports.Token = TokenDecorator_14.Token;
    exports.TokenType = TokenType_15.TokenType;
    exports.PairType = TokenType_15.PairType;
    exports.SuffixType = TokenType_15.SuffixType;
    exports.Tuplet = Tuplet_1.Tuplet;
    exports.UnrecognizedToken = UnrecognizedToken_2.UnrecognizedToken;
    exports.Section = Section_2.Section;
});
define("index", ["require", "exports", "Detokenizer", "Tokenizer", "tokens/index"], function (require, exports, Detokenizer_1, Tokenizer_4, index_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    // FIXME: find better way
    // tslint:disable-next-line:no-var-requires
    require('./Util');
    // tslint:disable-next-line:no-var-requires
    require('./Global');
    exports.Detokenizer = Detokenizer_1.Detokenizer;
    exports.Tokenizer = Tokenizer_4.Tokenizer;
    __export(index_1);
});
Array.prototype.last = function (index = 1) {
    return this[this.length - index];
};
String.prototype.calcOct = function () {
    let legal = true;
    let result = 0;
    for (let i = 0, len = this.length; i < len && legal; i++) {
        const element = this.charAt(i);
        if (element === ',') {
            result -= 1;
        }
        else {
            if (element === '\'') {
                result += 1;
            }
            else {
                legal = false;
            }
        }
    }
    if (legal) {
        return result;
    }
    else {
        return NaN;
    }
};
String.prototype.toFraction = function () {
    const possibleFraction = this.split('/');
    if (possibleFraction.length === 2) {
        const processedNum = possibleFraction
            .map((possibleNum) => Number(possibleNum))
            .filter((possibleNum) => possibleNum);
        if (processedNum.length === 2) {
            return { Numerator: processedNum[0], Denominator: processedNum[1] };
        }
    }
    return undefined;
};
String.prototype.toNumIfPossible = function () {
    const possibleNum = Number(this);
    if (Number.isNaN(possibleNum)) {
        const possibleFraction = this.toFraction();
        if (possibleFraction) {
            return possibleFraction.Numerator / possibleFraction.Denominator;
        }
        return this.valueOf();
    }
    else {
        return possibleNum;
    }
};
String.prototype.isNumeric = function () {
    return !isNaN(this - parseFloat(this));
};
Object.reverseFrom = (KVArray) => {
    const obj = {};
    KVArray.forEach((KVPair) => {
        obj[KVPair.key] = KVPair.value;
    });
    return obj;
};
Object.getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
};
//# sourceMappingURL=index.js.map