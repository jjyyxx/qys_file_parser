import { BaseToken } from './BaseToken.js';
import { SuffixType } from './TokenType';
declare class Suffix extends BaseToken {
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
