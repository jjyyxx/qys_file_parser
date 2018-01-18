import { BaseToken } from './BaseToken.js';
import { Pitch } from './Pitch';
import { Suffix } from './Suffix';
declare class Note extends BaseToken {
    static pattern: {
        qym: RegExp;
        qys: RegExp;
    };
    Pitches: Pitch[];
    readonly Suffix: Suffix[];
    Arpeggio: boolean;
    constructor(matched: RegExpMatchArray);
    parseQymPitch(pitchPart: string): void;
    parseQysPitch(pitchPart: string): void;
    toString(): string;
}
export { Note };
