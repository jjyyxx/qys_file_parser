import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Tie extends BaseToken {
    public static pattern = /^\^/
    constructor() {
        super(TokenType.Tie)
    }

    public toString(): string {
        return '^'
    }
}

export { Tie }
