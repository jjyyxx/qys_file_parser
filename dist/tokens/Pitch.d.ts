import { BaseToken } from './BaseToken';
import { Suffix } from './Suffix';
declare class Pitch extends BaseToken {
    static pattern: {
        qym: RegExp;
        qys: RegExp;
    };
    private static parseQymPitch(pitch);
    private static parseQysPitch(pitch);
    ScaleDegree: number;
    Suffix: Suffix[];
    constructor(pitch: string);
    toString(): string;
}
export { Pitch };
