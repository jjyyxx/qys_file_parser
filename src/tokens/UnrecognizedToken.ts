import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class UnrecognizedToken extends BaseToken {
    public readonly token: string

    constructor(token: string) {
        super(TokenType.Unrecognized)
        this.token = token
    }
}

export { UnrecognizedToken }
