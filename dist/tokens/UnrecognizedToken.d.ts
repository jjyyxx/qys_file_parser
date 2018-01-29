import { BaseToken } from './BaseToken';
declare class UnrecognizedToken extends BaseToken {
    readonly token: string;
    constructor(startIndex: number, token: string);
    toString(): string;
}
export { UnrecognizedToken };
