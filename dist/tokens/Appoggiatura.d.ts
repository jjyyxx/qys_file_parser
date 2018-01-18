import { BaseToken } from './BaseToken';
import { Note } from './Note';
declare class Appoggiatura extends BaseToken {
    static pattern: RegExp;
    Notes: Note[];
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { Appoggiatura };
