import { ILineTokens } from './LineTokenizer';
import { TokenizedData } from './TokenizedData';
import { BaseToken } from './tokens/BaseToken';
declare class Tokenizer {
    static tokenize<T extends BaseToken>(content: string, patterns?: Array<{
        constuctor: {
            new (...args: any[]): any;
        };
        pattern: RegExp;
    }>): T[];
    static isCommentLine(tokenizedLine: ILineTokens): boolean;
    static isInitLine(tokenizedLine: ILineTokens): boolean;
    private content;
    private lines;
    private tokenizedLines;
    private tokenizedData;
    private lineTok;
    private state;
    constructor(content: string);
    tokenize(): TokenizedData;
    tokenizeLines(): void;
    processQym(): void;
    processQys(): void;
    private concatLines();
}
export { Tokenizer };
