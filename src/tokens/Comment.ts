import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Comment extends BaseToken {
    public static pattern = /^\/\/.*$/
    public readonly comment: string

    constructor(startIndex: number, matched: RegExpMatchArray) {
        super(TokenType.Comment, startIndex)
        this.comment = matched[0].slice(2)
    }

    public toString(): string {
        return `//${this.comment}\n`
    }
}

export { Comment }
