import { BaseStructure, BaseToken } from './BaseToken';
declare function Token(constructor: {
    pattern: RegExp | {
        [key: string]: RegExp;
    };
    new (...args: any[]): BaseToken;
}): void;
declare function Structure(constructor: {
    pattern: RegExp | {
        [key: string]: RegExp;
    };
    new (...args: any[]): BaseStructure;
}): void;
export { Token, Structure };
