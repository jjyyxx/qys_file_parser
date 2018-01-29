import { ILineTokens } from '../LineTokenizer';
import { BaseToken } from './BaseToken';
import { Comment } from './Comment';
import { FunctionToken } from './Function';
export declare type Track = BaseToken[];
declare class Section {
    static separateComments(content: ILineTokens[]): {
        Comments: Comment[];
        remainedContent: ILineTokens[];
    };
    GlobalSettings: FunctionToken[];
    Comments: Comment[];
    Tracks: Track[];
    constructor(content: ILineTokens[]);
    toString(): string;
}
export { Section };
