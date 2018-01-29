import { BaseToken } from './BaseToken';
declare class Portamento extends BaseToken {
    static pattern: RegExp;
    constructor(startIndex: number);
    toString(): string;
}
export { Portamento };
