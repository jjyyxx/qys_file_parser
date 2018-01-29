import { BaseToken } from './BaseToken';
declare class Tie extends BaseToken {
    static pattern: RegExp;
    constructor(startIndex: number);
    toString(): string;
}
export { Tie };
