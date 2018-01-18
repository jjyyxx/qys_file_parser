import { BaseStructure, BaseToken } from './BaseToken';
import { Comment } from './Comment';
import { FunctionToken } from './Function';
import { FunctionSimplified } from './FunctionSimplified';
export declare type Track = BaseToken[];
declare class Section extends BaseStructure {
    static pattern: {
        qym: RegExp;
        qys: RegExp;
    };
    static separateComments(content: string): {
        Comments: Comment[];
        remainedContent: string;
    };
    GlobalSettings: Array<FunctionToken | FunctionSimplified>;
    Comments: Comment[];
    Tracks: Track[];
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { Section };
