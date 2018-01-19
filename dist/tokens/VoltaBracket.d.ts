import { BaseToken } from './BaseToken';
declare class VoltaBracket extends BaseToken {
    static pattern: {
        qym: RegExp;
    };
    readonly NumbersOfTimes: number[];
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { VoltaBracket };