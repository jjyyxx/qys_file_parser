import { BaseToken } from './BaseToken';
declare class FunctionToken extends BaseToken {
    static pattern: RegExp;
    static parseNormal(content: string): {
        key: string;
        value: string | number;
    };
    static parseSimplified(func: string): any[];
    private static parseTonality(possibleKey);
    private static calcOctave(content, char);
    Name: string;
    Argument: any;
    Simplfied: boolean;
    constructor(startIndex: number, matched: RegExpMatchArray);
    toString(): string;
}
export { FunctionToken };
