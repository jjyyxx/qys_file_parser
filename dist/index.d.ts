declare module "tokens/TokenType" {
    enum TokenType {
        Note = 0,
        Suffix = 1,
        Tie = 2,
        Chord = 3,
        Tuplet = 4,
        Appoggiatura = 5,
        MeasureBound = 6,
        Comment = 7,
        RepeatBound = 8,
        RepeatSkip = 9,
        Terminal = 10,
        Function = 11,
        FunctionSimplified = 12,
        Unrecognized = 13,
    }
    enum StructureType {
        Header = 0,
        Section = 1,
    }
    enum SuffixType {
        Flat = 0,
        Sharp = 1,
        DotAbove = 2,
        DotBelow = 3,
        DotAfter = 4,
        Underline = 5,
        Dash = 6,
    }
    enum PairType {
        Left = 0,
        Right = 1,
    }
    export { TokenType, StructureType, SuffixType, PairType };
}
declare module "tokens/BaseToken" {
    import { StructureType, TokenType } from "tokens/TokenType";
    abstract class Base<T> {
        readonly type: T;
        constructor(type: T);
    }
    class BaseToken extends Base<TokenType> {
    }
    class BaseStructure extends Base<StructureType> {
    }
    export { Base, BaseToken, BaseStructure };
}
declare module "tokens/UnrecognizedToken" {
    import { BaseToken } from "tokens/BaseToken";
    class UnrecognizedToken extends BaseToken {
        readonly token: string;
        constructor(token: string);
        toString(): string;
    }
    export { UnrecognizedToken };
}
declare module "Global" {
    import { BaseStructure, BaseToken } from "tokens/BaseToken";
    import { UnrecognizedToken } from "tokens/UnrecognizedToken";
    class Global {
        static TokenPatterns: Array<{
            constuctor: {
                new (...args: any[]): BaseToken;
            };
            pattern: RegExp;
        }>;
        static StructurePatterns: Array<{
            constuctor: {
                new (...args: any[]): BaseStructure;
            };
            pattern: RegExp;
        }>;
        static FallbackToken: typeof UnrecognizedToken;
        static tonalityDict: {
            [key: string]: number;
        };
        static legalTonality: Set<string>;
        static legalSettings: Set<string>;
        static SortedTonality: string[];
        static RegisterTokenPattern(constuctor: {
            new (...args: any[]): BaseToken;
        }, pattern: RegExp): void;
        static RegisterStructurePattern(constuctor: {
            new (...args: any[]): BaseStructure;
        }, pattern: RegExp): void;
        static isLegalSetting(key: string): boolean;
        static isLegalTonality(key: string): boolean;
    }
    export { Global };
}
declare module "tokens/TokenDecorator" {
    import { BaseStructure, BaseToken } from "tokens/BaseToken";
    function Token(constructor: {
        pattern: RegExp;
        new (...args: any[]): BaseToken;
    }): void;
    function Structure(constructor: {
        pattern: RegExp;
        new (...args: any[]): BaseStructure;
    }): void;
    export { Token, Structure };
}
declare module "tokens/Comment" {
    import { BaseToken } from "tokens/BaseToken";
    class Comment extends BaseToken {
        static pattern: RegExp;
        readonly comment: string;
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { Comment };
}
declare module "Tokenizer" {
    import { TokenizedData } from "TokenizedData";
    import { BaseStructure, BaseToken } from "tokens/BaseToken";
    class Tokenizer {
        static tokenize<T extends BaseToken | BaseStructure>(content: string, patterns?: Array<{
            constuctor: {
                new (...args: any[]): any;
            };
            pattern: RegExp;
        }>): T[];
        private content;
        private tokenizedData;
        constructor(content: string);
        tokenize(): TokenizedData;
        separateGlobalComments(): void;
    }
    export { Tokenizer };
}
declare module "tokens/Function" {
    import { BaseToken } from "tokens/BaseToken";
    class FunctionToken extends BaseToken {
        static pattern: RegExp;
        static parse(content: string): {
            key: string;
            value: string | number;
        };
        Name: string;
        Argument: string | number;
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { FunctionToken };
}
declare module "tokens/FunctionSimplified" {
    import { BaseToken } from "tokens/BaseToken";
    class FunctionSimplified extends BaseToken {
        static pattern: RegExp;
        static parse(content: string): {
            key: string;
            value: any;
        }[];
        private static parseTonality(possibleKey);
        private static calcOctave(content, char);
        Name: string;
        Argument: string | number | {};
        constructor(matched: RegExpMatchArray);
        toString(): string;
        private reverse();
    }
    export { FunctionSimplified };
}
declare module "tokens/Section" {
    import { BaseStructure, BaseToken } from "tokens/BaseToken";
    import { Comment } from "tokens/Comment";
    import { FunctionToken } from "tokens/Function";
    import { FunctionSimplified } from "tokens/FunctionSimplified";
    export type Track = BaseToken[];
    class Section extends BaseStructure {
        static pattern: RegExp;
        static separateComments(content: string): {
            Comments: Comment[];
            remainedContent: string;
        };
        GlobalSettings: Array<FunctionToken | FunctionSimplified>;
        Comments: Comment[];
        Tracks: Track[];
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { Section };
}
declare module "TokenizedData" {
    import { Comment } from "tokens/Comment";
    import { Section } from "tokens/Section";
    class TokenizedData {
        Comments: Comment[];
        Sections: Section[];
        constructor();
        toString(): string;
    }
    export { TokenizedData };
}
declare module "Detokenizer" {
    import { TokenizedData } from "TokenizedData";
    class Detokenizer {
        readonly tokenizedData: TokenizedData;
        constructor(tokenizedData: TokenizedData);
        detokenize(): string;
    }
    export { Detokenizer };
}
declare module "tokens/Suffix" {
    import { BaseToken } from "tokens/BaseToken";
    import { SuffixType } from "tokens/TokenType";
    class Suffix extends BaseToken {
        static pattern: RegExp;
        static readonly SuffixDict: {
            [Key: string]: SuffixType;
        };
        readonly suffixType: SuffixType;
        readonly dotCount: number;
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { Suffix };
}
declare module "tokens/Note" {
    import { BaseToken } from "tokens/BaseToken";
    import { Suffix } from "tokens/Suffix";
    class Note extends BaseToken {
        static pattern: RegExp;
        static readonly pitchDict: {
            [key: number]: number;
        };
        Pitches: Array<{
            ScaleDegree: number;
            Suffix: Suffix[];
        }>;
        readonly Suffix: Suffix[];
        constructor(matched: RegExpMatchArray);
        parsePitch(pitchPart: string): void;
        toString(): string;
    }
    export { Note };
}
declare module "tokens/Appoggiatura" {
    import { BaseToken } from "tokens/BaseToken";
    import { Note } from "tokens/Note";
    class Appoggiatura extends BaseToken {
        static pattern: RegExp;
        Notes: Note[];
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { Appoggiatura };
}
declare module "tokens/MeasureBound" {
    import { BaseToken } from "tokens/BaseToken";
    class MeasureBound extends BaseToken {
        static pattern: RegExp;
        constructor();
        toString(): string;
    }
    export { MeasureBound };
}
declare module "tokens/RepeatBound" {
    import { BaseToken } from "tokens/BaseToken";
    import { PairType } from "tokens/TokenType";
    class RepeatBound extends BaseToken {
        static pattern: RegExp;
        readonly leftOrRight: PairType;
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { RepeatBound };
}
declare module "tokens/RepeatSkip" {
    import { BaseToken } from "tokens/BaseToken";
    class RepeatSkip extends BaseToken {
        static pattern: RegExp;
        readonly parts: number[];
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { RepeatSkip };
}
declare module "tokens/Terminal" {
    import { BaseToken } from "tokens/BaseToken";
    class Terminal extends BaseToken {
        static pattern: RegExp;
        constructor();
        toString(): string;
    }
    export { Terminal };
}
declare module "tokens/Tie" {
    import { BaseToken } from "tokens/BaseToken";
    class Tie extends BaseToken {
        static pattern: RegExp;
        constructor();
        toString(): string;
    }
    export { Tie };
}
declare module "tokens/Tuplet" {
    import { BaseToken } from "tokens/BaseToken";
    class Tuplet extends BaseToken {
        static pattern: RegExp;
        readonly count: number;
        constructor(matched: RegExpMatchArray);
        toString(): string;
    }
    export { Tuplet };
}
declare module "tokens/index" {
    export { Appoggiatura } from "tokens/Appoggiatura";
    export { BaseToken } from "tokens/BaseToken";
    export { Comment } from "tokens/Comment";
    export { FunctionToken } from "tokens/Function";
    export { FunctionSimplified } from "tokens/FunctionSimplified";
    export { MeasureBound } from "tokens/MeasureBound";
    export { Note } from "tokens/Note";
    export { RepeatBound } from "tokens/RepeatBound";
    export { RepeatSkip } from "tokens/RepeatSkip";
    export { Suffix } from "tokens/Suffix";
    export { Terminal } from "tokens/Terminal";
    export { Tie } from "tokens/Tie";
    export { Token } from "tokens/TokenDecorator";
    export { TokenType, PairType, SuffixType } from "tokens/TokenType";
    export { Tuplet } from "tokens/Tuplet";
    export { UnrecognizedToken } from "tokens/UnrecognizedToken";
    export { Section } from "tokens/Section";
}
declare module "index" {
    export { Detokenizer } from "Detokenizer";
    export { Tokenizer } from "Tokenizer";
    export * from "tokens/index";
}
interface Array<T> {
    last(index?: number): T;
}
interface Fraction {
    Numerator: number;
    Denominator: number;
}
interface String {
    calcOct(): number;
    toNumIfPossible(): (number | string);
    toFraction(): Fraction;
    isNumeric(): boolean;
}
interface ObjectConstructor {
    reverseFrom(KVArray: Array<{
        key: string;
        value: any;
    }>): object;
    getKeyByValue(object: object, value: any): any;
}
