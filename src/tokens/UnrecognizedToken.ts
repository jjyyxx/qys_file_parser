import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

class UnrecognizedToken extends BaseToken {
    public readonly token: string

    constructor(startIndex: number, token: string) {
        super(TokenType.Unrecognized, startIndex)
        this.token = token
    }

    public toString(): string {
        return this.token
    }
}

export { UnrecognizedToken }
