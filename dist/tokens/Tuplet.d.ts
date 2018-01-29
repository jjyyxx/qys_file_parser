import { BaseToken } from './BaseToken';
declare class Tuplet extends BaseToken {
    static pattern: {
        qym: RegExp;
        qys: RegExp;
    };
    readonly count: number;
    constructor(startIndex: number, matched: RegExpMatchArray);
    toString(): string;
}
export { Tuplet };
