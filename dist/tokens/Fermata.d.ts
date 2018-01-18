import { BaseToken } from './BaseToken';
declare class Fermata extends BaseToken {
    static pattern: RegExp;
    Ratio: number;
    constructor();
    toString(): string;
}
export { Fermata };
