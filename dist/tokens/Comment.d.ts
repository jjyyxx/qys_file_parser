import { BaseToken } from './BaseToken';
declare class Comment extends BaseToken {
    static pattern: RegExp;
    readonly comment: string;
    constructor(matched: RegExpMatchArray);
    toString(): string;
}
export { Comment };
