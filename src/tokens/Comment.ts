import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Comment extends BaseToken {
    public readonly comment: string

    constructor(comment: string) {
        super(TokenType.Comment)
        this.comment = comment
    }
}

export { Comment }
