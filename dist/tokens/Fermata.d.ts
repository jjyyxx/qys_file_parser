import { BaseToken } from './BaseToken';
declare class Fermata extends BaseToken {
    static pattern: RegExp;
    Ratio: number;
    constructor(startIndex: number);
    toString(): string;
}
export { Fermata };
