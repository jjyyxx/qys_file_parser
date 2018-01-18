import { BaseToken } from './BaseToken';
declare class UnrecognizedToken extends BaseToken {
    readonly token: string;
    constructor(token: string);
    toString(): string;
}
export { UnrecognizedToken };
