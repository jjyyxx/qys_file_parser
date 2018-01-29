import { BaseToken } from './BaseToken'
import { Token } from './TokenDecorator'
import { TokenType } from './TokenType'

@Token
class Tie extends BaseToken {
    public static pattern = /^\^/
    constructor(startIndex: number) {
        super(TokenType.Tie, startIndex)
    }

    public toString(): string {
        return '^'
    }
}

export { Tie }
