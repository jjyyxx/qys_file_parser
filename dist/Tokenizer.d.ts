import { TokenizedData } from './TokenizedData';
import { BaseStructure, BaseToken } from './tokens/BaseToken';
declare class Tokenizer {
    static tokenize<T extends BaseToken | BaseStructure>(content: string, patterns?: Array<{
        constuctor: {
            new (...args: any[]): any;
        };
        pattern: RegExp;
    }>): T[];
    private content;
    private tokenizedData;
    constructor(content: string);
    tokenize(): TokenizedData;
}
export { Tokenizer };
