import { BaseToken } from './BaseToken';
declare function Token(constructor: {
    pattern: RegExp | {
        [key: string]: RegExp;
    };
    new (...args: any[]): BaseToken;
}): void;
export { Token };
