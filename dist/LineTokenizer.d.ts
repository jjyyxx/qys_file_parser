import { BaseToken } from './index';
import { State } from './State';
export interface TokensProvider {
    getInitialState(): IState;
    tokenize(line: string, state: IState): ILineTokens;
}
export interface IState {
    clone(): IState;
    equals(other: IState): boolean;
}
export interface ILineTokens {
    tokens: IToken[];
    endState: IState;
}
export interface IToken {
    startIndex: number;
    scopes: string;
}
declare class LineTokenizer implements TokensProvider {
    static tokenize<T extends BaseToken>(content: string, patterns?: Array<{
        constuctor: {
            new (...args: any[]): any;
        };
        pattern: RegExp;
    }>): T[];
    tokenize(line: string, state: State): ILineTokens;
    getInitialState(): State;
}
export { LineTokenizer };
