import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class UnrecognizedToken extends BaseToken {
    public static pattern = /./
    public readonly token: string

    constructor(token: string) {
        super(TokenType.Unrecognized)
        this.token = token
    }

    public toString(): string {
        return this.token
    }
}

export { UnrecognizedToken }
