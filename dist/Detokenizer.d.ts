import { TokenizedData } from './TokenizedData';
declare class Detokenizer {
    readonly tokenizedData: TokenizedData;
    constructor(tokenizedData: TokenizedData);
    detokenize(): string;
}
export { Detokenizer };
