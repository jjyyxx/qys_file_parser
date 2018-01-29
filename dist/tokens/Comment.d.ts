import { BaseToken } from './BaseToken';
declare class Comment extends BaseToken {
    static pattern: RegExp;
    readonly comment: string;
    constructor(startIndex: number, matched: RegExpMatchArray);
    toString(): string;
}
export { Comment };
