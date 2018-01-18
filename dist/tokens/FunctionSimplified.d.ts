import { BaseToken } from './BaseToken';
declare class FunctionSimplified extends BaseToken {
    static pattern: RegExp;
    static parse(func: string): {
        key: string;
        value: number;
    }[] | {
        key: string;
        value: string;
    }[];
    private static parseTonality(possibleKey);
    private static calcOctave(content, char);
    Name: string;
    Argument: string | number | {};
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { FunctionSimplified };
