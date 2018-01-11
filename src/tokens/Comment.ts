import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Comment extends BaseToken {
    public static pattern = /./
    public readonly comment: string

    constructor(comment: string) {
        super(TokenType.Comment)
        this.comment = comment
    }

    public toString(): string {
        return `//${this.comment}\n`
    }
}

export { Comment }
