import { BaseToken } from './BaseToken';
import { BoundType } from './TokenType';
declare class MeasureBound extends BaseToken {
    static pattern: RegExp;
    readonly BoundType: BoundType;
    NewLine: boolean;
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { MeasureBound };