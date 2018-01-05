import { BaseToken } from './BaseToken'
import { PairType, TokenType } from './TokenType'

class Repeat extends BaseToken {
    public readonly leftOrRight: PairType

    constructor(leftOrRight: PairType) {
        super(TokenType.Repeat)
        this.leftOrRight = leftOrRight
    }
}

export { Repeat }
