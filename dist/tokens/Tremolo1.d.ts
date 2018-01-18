import { BaseToken } from './BaseToken';
declare class Tremolo1 extends BaseToken {
    static pattern: RegExp;
    StrokesCount: number;
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { Tremolo1 };
