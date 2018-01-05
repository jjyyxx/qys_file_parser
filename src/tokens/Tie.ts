import { BaseToken } from './BaseToken'
import { TokenType } from './TokenType'

class Tie extends BaseToken {
    constructor() {
        super(TokenType.Tie)
    }

    public toString(): string {
        return '^'
    }
}

export { Tie }
