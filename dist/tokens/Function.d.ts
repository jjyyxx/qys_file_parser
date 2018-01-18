import { BaseToken } from './BaseToken';
declare class FunctionToken extends BaseToken {
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
