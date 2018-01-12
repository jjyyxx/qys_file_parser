import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Comment extends BaseToken {
    public static pattern = /^\/\/.*\n/
    public readonly comment: string

    constructor(matched: RegExpMatchArray) {
        super(TokenType.Comment)
        this.comment = matched[0].slice(2, -1)
    }

    public toString(): string {
        return `//${this.comment}\n`
    }
}

export { Comment }
